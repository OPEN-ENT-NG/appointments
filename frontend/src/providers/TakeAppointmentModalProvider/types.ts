import { Dispatch, ReactNode, SetStateAction } from "react";

import { UserCardInfos } from "../FindAppointmentsProvider/types";
import { DaySlotsProps } from "~/components/DaySlots/types";
import { SLOT_DURATION } from "~/core/enums";

export interface TakeAppointmentModalProviderContextProps {
  selectedUser: UserCardInfos | null;
  isModalOpen: boolean;
  gridsName: string[];
  gridInfo: GridInfoType;
  gridSlots: DaySlotsProps[];
  selectedGridName: string;
  selectedSlotId: string | null;
  handleGridChange: (gridName: string) => void;
  handleOnClickSlot: (slotId: string) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnClickCard: (user: UserCardInfos | null) => void;
}

export interface TakeAppointmentModalProviderProps {
  children: ReactNode;
}

export interface GridInfoType {
  visio: boolean;
  slotDuration: SLOT_DURATION;
  location: string;
  publicComment: string;
}
