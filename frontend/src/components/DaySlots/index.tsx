import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

import { noSlotsStyle, TimeSlot, timeSlotWrapperStyle } from "./style";
import { DaySlotsProps } from "./types";
import { formatTimeToString } from "~/core/utils/date.utils";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";

export const DaySlots: FC<DaySlotsProps> = ({ slots }) => {
  const { handleOnClickSlot, selectedSlotId } =
    useTakeAppointmentModalProvider();

  return (
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
  );
};
