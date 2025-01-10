import { FC, useEffect, useRef, useState } from "react";

import { Box, Pagination, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  containerStyle,
  paginationBoxStyle,
  paginationStyle,
  wrapperListBox,
} from "./style";
import { AppointmentCardListProps } from "./types";
import { AppointmentCard } from "~/components/AppointmentCard";
import {
  APPOINTMENT_CARD_WIDTH,
  APPOINTMENT_CARDS_GAP,
  MY_APPOINTMENTS_LIST_STATE_VALUES,
} from "~/core/constants";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";

export const AppointmentCardList: FC<AppointmentCardListProps> = ({
  appointmentsType,
  myAppointments,
}) => {
  const { t } = useTranslation("appointments");
  const { handleChangeLimit, handleChangePage, limits, pages } =
    useMyAppointments();

  const [containerWidth, setContainerWidth] = useState<number | undefined>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (containerWidth)
      handleChangeLimit(
        appointmentsType,
        Math.floor(
          (containerWidth + APPOINTMENT_CARDS_GAP) / APPOINTMENT_CARD_WIDTH,
        ),
      );
  }, [containerWidth]);

  const appointmentsLength = myAppointments.appointments.length;

  const paginationWidth =
    appointmentsLength * APPOINTMENT_CARD_WIDTH - APPOINTMENT_CARDS_GAP;

  return (
    <Box ref={containerRef} sx={containerStyle}>
      <Typography variant="h3" color="primary" fontWeight="bold">
        {t(MY_APPOINTMENTS_LIST_STATE_VALUES[appointmentsType].i18nTitleKey)}
      </Typography>
      {!myAppointments.total ? (
        <Typography fontStyle={"italic"} variant="h5">
          {t(
            MY_APPOINTMENTS_LIST_STATE_VALUES[appointmentsType]
              .i18nEmptyStateKey,
          )}
        </Typography>
      ) : (
        <Box sx={wrapperListBox}>
          {myAppointments.appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </Box>
      )}
      <Box
        sx={{
          ...paginationBoxStyle,
          width: paginationWidth,
        }}
      >
        {myAppointments.total > limits[appointmentsType] && (
          <Pagination
            count={Math.ceil(myAppointments.total / limits[appointmentsType])}
            page={pages[appointmentsType]}
            onChange={(_, newPage) =>
              handleChangePage(appointmentsType, newPage)
            }
            showFirstButton={appointmentsLength > 1}
            showLastButton={appointmentsLength > 1}
            siblingCount={appointmentsLength > 1 ? 1 : 0}
            boundaryCount={appointmentsLength > 1 ? 1 : 0}
            variant="text"
            sx={paginationStyle}
          />
        )}
      </Box>
    </Box>
  );
};
