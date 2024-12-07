import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Skeleton } from "@mui/material";

import { useTakeAppointmentModal } from "~/providers/TakeAppointmentModalProvider";
import {
  noSlotsStyle,
  skeletonStyle,
  TimeSlot,
  TimeSlotWrapper,
} from "./style";
import { DaySlotsProps } from "./types";
import { sortSlots } from "./utils";

export const DaySlots: FC<DaySlotsProps> = ({ slots, modalSize }) => {
  const { handleOnClickSlot, selectedSlotId } = useTakeAppointmentModal();

  const sortedSlots = slots ? sortSlots(slots) : [];

  const randomNbOfSkeletons = Math.floor(Math.random() * 5) + 1;

  return (
    <TimeSlotWrapper modalSize={modalSize}>
      {slots ? (
        sortedSlots.length ? (
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
        )
      ) : (
        Array.from({ length: randomNbOfSkeletons }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" sx={skeletonStyle} />
        ))
      )}
    </TimeSlotWrapper>
  );
};
