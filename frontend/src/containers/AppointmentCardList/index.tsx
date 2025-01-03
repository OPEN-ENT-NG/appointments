import { FC } from "react";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AppointmentCardListProps } from "./types";
import { AppointmentCard } from "~/components/AppointmentCard";
import { MY_APPOINTMENTS_LIST_STATE_VALUES } from "~/core/constants";

export const AppointmentCardList: FC<AppointmentCardListProps> = ({
  appointmentsType,
  myAppointments,
}) => {
  const { t } = useTranslation("appointments");

  return (
    <Box>
      <Typography>
        {t(MY_APPOINTMENTS_LIST_STATE_VALUES[appointmentsType].i18nTitleKey)}
      </Typography>
      {myAppointments.appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </Box>
  );
};
