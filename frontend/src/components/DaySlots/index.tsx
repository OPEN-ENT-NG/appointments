import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

import { useTakeAppointmentModal } from "~/providers/TakeAppointmentModalProvider";
import { noSlotsStyle, TimeSlot, TimeSlotWrapper } from "./style";
import { DaySlotsProps } from "./types";
import { sortSlots } from "./utils";

export const DaySlots: FC<DaySlotsProps> = ({ slots, modalSize }) => {
  const { handleOnClickSlot, selectedSlotId } = useTakeAppointmentModal();

  const sortedSlots = sortSlots(slots);

  return (
    <TimeSlotWrapper modalSize={modalSize}>
      {sortedSlots.length ? (
        sortedSlots.map((slot) => (
          <TimeSlot
            onClick={() => handleOnClickSlot(slot.id)}
            selected={slot.id === selectedSlotId}
            variant="text"
            key={slot.id}
          >
            {slot.begin.parseToString()}
          </TimeSlot>
        ))
      ) : (
        <Box sx={noSlotsStyle}>
          <CloseIcon />
        </Box>
      )}
    </TimeSlotWrapper>
  );
};
