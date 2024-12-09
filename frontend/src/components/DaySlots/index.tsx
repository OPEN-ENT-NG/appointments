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

export const DaySlots: FC<DaySlotsProps> = ({
  slots,
  modalSize,
  isVisioOptionVisible,
}) => {
  const { handleOnClickSlot, selectedSlotId } = useTakeAppointmentModal();

  const sortedSlots = slots ? sortSlots(slots) : [];

  const nbOfSkeletons = 5;

  return (
    <TimeSlotWrapper
      modalSize={modalSize}
      isVisioOptionVisible={isVisioOptionVisible}
    >
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
        Array.from({ length: nbOfSkeletons }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" sx={skeletonStyle} />
        ))
      )}
    </TimeSlotWrapper>
  );
};
