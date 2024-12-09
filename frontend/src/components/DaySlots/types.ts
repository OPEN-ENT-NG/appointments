import { MODAL_SIZE } from "~/containers/TakeAppointmentModal/enum";
import { Slot } from "~/core/types";

export interface DaySlotsProps {
  slots: Slot[] | null;
  modalSize: MODAL_SIZE;
  isVisioOptionVisible: boolean;
}

export interface TimeSlotProps {
  selected: boolean;
}

export interface TimeSlotWrapperProps {
  modalSize: MODAL_SIZE;
  isVisioOptionVisible: boolean;
}
