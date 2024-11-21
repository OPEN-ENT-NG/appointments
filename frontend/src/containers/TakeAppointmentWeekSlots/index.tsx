import { FC } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
        <Box>
          <KeyboardArrowLeftIcon />
        </Box>
        {gridSlots.map((daySlot, index) => (
          <DaySlots
            key={index}
            weekDay={daySlot.weekDay}
            day={daySlot.day}
            slots={daySlot.slots}
          />
        ))}
        <Box>
          <KeyboardArrowRightIcon />
        </Box>
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
