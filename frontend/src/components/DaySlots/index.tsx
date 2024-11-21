import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  daySlotsHeaderStyle,
  DaySlotsWrapper,
  dayStyle,
  noSlotsStyle,
  TimeSlot,
  timeSlotWrapperStyle,
  weekDayStyle,
} from "./style";
import { DaySlotsProps } from "./types";
import { formatTimeToString } from "~/core/utils/date.utils";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";

export const DaySlots: FC<DaySlotsProps> = ({ weekDay, day, slots }) => {
  const { t } = useTranslation("appointments");
  const { handleOnClickSlot, selectedSlotId } =
    useTakeAppointmentModalProvider();

  return (
    <DaySlotsWrapper isEmpty={!slots.length}>
      <Box sx={daySlotsHeaderStyle}>
        <Typography sx={weekDayStyle}>
          {t(`appointments.${weekDay.toLowerCase()}`)}
        </Typography>
        <Typography sx={dayStyle}>
          {day.locale("fr").format("D MMMM")}
        </Typography>
      </Box>
      <Box sx={timeSlotWrapperStyle}>
        {slots.length ? (
          slots.map((slot) => (
            <TimeSlot
              onClick={() => handleOnClickSlot(slot.id)}
              selected={slot.id === selectedSlotId}
              variant="text"
              key={slot.id}
            >
              {formatTimeToString(slot.begin)}
            </TimeSlot>
          ))
        ) : (
          <Box sx={noSlotsStyle}>
            <CloseIcon />
          </Box>
        )}
      </Box>
    </DaySlotsWrapper>
  );
};
