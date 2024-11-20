import { FC } from "react";

import { Box, Checkbox, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  containerStyle,
  visioOptionStyle,
  weekSlotsWrapperStyle,
} from "./style";
import { DaySlots } from "~/components/DaySlots";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";
import { flexStartBoxStyle } from "~/styles/boxStyles";

export const TakeAppointmentWeekSlots: FC = () => {
  const { t } = useTranslation("appointments");

  const { gridSlots } = useTakeAppointmentModalProvider();
  return (
    <Box sx={containerStyle}>
      <Box sx={weekSlotsWrapperStyle}>
        {gridSlots.map((daySlot, index) => (
          <DaySlots
            key={index}
            weekDay={daySlot.weekDay}
            day={daySlot.day}
            slots={daySlot.slots}
          />
        ))}
      </Box>
      <Box sx={flexStartBoxStyle}>
        <Checkbox />
        <Typography sx={visioOptionStyle}>
          {t("appointments.take.appointment.modal.visio.option")}
        </Typography>
      </Box>
    </Box>
  );
};
