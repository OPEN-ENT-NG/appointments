import { forwardRef, useEffect, useRef, useState } from "react";

import { Box, Tooltip, Typography } from "@cgi-learning-hub/ui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { APPOINTMENTS } from "~/core/constants";
import { useBookAppointmentModal } from "~/providers/BookAppointmentModalProvider";
import { UserPicture } from "../UserPicture";
import {
  pictureStyle,
  statusBoxStyle,
  StatusColor,
  textWrapperStyle,
  topTextWrapperStyle,
  WrapperUserCard,
} from "./style";
import { UserCardProps } from "./types";
import { useGlobal } from "~/providers/GlobalProvider";

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  ({ infos }, ref) => {
    const {
      picture,
      displayName,
      functions,
      lastAppointmentDate,
      isAvailable,
    } = infos;
    const [isEllipsisDisplayName, setIsEllipsisDisplayName] = useState(false);
    const [isEllipsisfunctions, setIsEllipsisfunctions] = useState(false);

    const { t } = useTranslation(APPOINTMENTS);
    const { handleOnClickCard } = useBookAppointmentModal();
    const { setGridIdFromLink } = useGlobal();

    const displayNameRef = useRef<HTMLDivElement>(null);
    const functionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (displayNameRef.current) {
        const { scrollWidth, clientWidth } = displayNameRef.current;
        setIsEllipsisDisplayName(scrollWidth > clientWidth);
      }
    }, [displayName]);

    useEffect(() => {
      if (functionsRef.current) {
        const { scrollWidth, clientWidth } = functionsRef.current;
        setIsEllipsisfunctions(scrollWidth > clientWidth);
      }
    }, [functions]);

    const userLanguage = navigator.language.split("-")[0] || "en";
    const lastAppointmentDateDisplayFormat = lastAppointmentDate
      ? dayjs(lastAppointmentDate).locale(userLanguage).format("D MMMM YYYY")
      : null;

    return (
      <WrapperUserCard
        isAvailable={isAvailable}
        ref={ref}
        onClick={() => {
          setGridIdFromLink(null);
          handleOnClickCard(isAvailable ? infos : null);
        }}
      >
        <Box sx={pictureStyle}>
          <UserPicture picture={picture} />
        </Box>
        <Box sx={textWrapperStyle}>
          <Box sx={topTextWrapperStyle}>
            <Tooltip
              title={isEllipsisDisplayName ? displayName : ""}
              placement="top"
            >
              <Typography
                variant="body1"
                color="textPrimary"
                ref={displayNameRef}
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {displayName}
              </Typography>
            </Tooltip>
            <Tooltip
              title={isEllipsisfunctions ? functions.join(", ") : ""}
              placement="bottom"
            >
              <Typography
                color="textPrimary"
                ref={functionsRef}
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "1.3rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {functions.join(", ")}
              </Typography>
            </Tooltip>
            <Typography
              color="textPrimary"
              sx={{ fontSize: "1.3rem", fontStyle: "italic" }}
            >
              {!!lastAppointmentDate &&
                t("appointments.last.appointment", {
                  date: lastAppointmentDateDisplayFormat,
                })}
            </Typography>
          </Box>
          <Box sx={statusBoxStyle}>
            <StatusColor isAvailable={isAvailable} />
            <Typography
              color="textSecondary"
              sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
            >
              {t("appointments." + (isAvailable ? "available" : "unavailable"))}
            </Typography>
          </Box>
        </Box>
      </WrapperUserCard>
    );
  },
);
