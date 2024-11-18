import { forwardRef, useEffect, useRef, useState } from "react";

import { Box, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import {
  displayNameStyle,
  lastAppointmentStyle,
  noAvatarStyle,
  professionStyle,
  statusBoxStyle,
  StatusColor,
  statusStyle,
  textWrapperStyle,
  topTextWrapperStyle,
  WrapperUserCard,
} from "./style";
import { UserCardProps } from "./types";
import { NoAvatar } from "../SVG/NoAvatar";
import { GREY } from "~/styles/color.constants";

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  ({ infos }, ref) => {
    const { t } = useTranslation("appointments");
    const userLanguage = navigator.language.split("-")[0] || "en";

    const displayName = infos.displayName;
    const profession = infos.profession;
    const lastAppointment = infos.lastAppointment
      ? dayjs(infos.lastAppointment).locale(userLanguage).format("D MMMM YYYY")
      : null;
    const status = infos.status;

    const displayNameRef = useRef<HTMLDivElement>(null);
    const [isElipsisDisplayName, setIsElipsisDisplayName] = useState(false);

    const professionRef = useRef<HTMLDivElement>(null);
    const [isElipsisProfession, setIsElipsisProfession] = useState(false);

    useEffect(() => {
      if (displayNameRef.current) {
        const { scrollWidth, clientWidth } = displayNameRef.current;
        setIsElipsisDisplayName(scrollWidth > clientWidth);
      }
    }, [displayName]);

    useEffect(() => {
      if (professionRef.current) {
        const { scrollWidth, clientWidth } = professionRef.current;
        setIsElipsisProfession(scrollWidth > clientWidth);
      }
    }, [profession]);

    return (
      <WrapperUserCard status={infos.status} ref={ref}>
        <Box sx={noAvatarStyle}>
          {!infos.profilePicture && <NoAvatar fill={GREY} />}
        </Box>
        <Box sx={textWrapperStyle}>
          <Box sx={topTextWrapperStyle}>
            <Tooltip
              title={isElipsisDisplayName ? displayName : ""}
              placement="top"
            >
              <Typography
                variant="h5"
                sx={displayNameStyle}
                ref={displayNameRef}
              >
                {displayName}
              </Typography>
            </Tooltip>
            <Tooltip
              title={isElipsisProfession ? profession : ""}
              placement="bottom"
            >
              <Typography sx={professionStyle} ref={professionRef}>
                {profession}
              </Typography>
            </Tooltip>
            <Typography sx={lastAppointmentStyle}>{lastAppointment}</Typography>
          </Box>
          <Box sx={statusBoxStyle}>
            <StatusColor status={status} />
            <Typography sx={statusStyle}>
              {t("appointments." + status.toLowerCase())}
            </Typography>
          </Box>
        </Box>
      </WrapperUserCard>
    );
  },
);
