import { Dispatch, ReactNode, SetStateAction } from "react";

import { Dayjs } from "dayjs";

import { DAY, SLOT_DURATION } from "~/core/enums";
import { Slot } from "~/core/types";
import { UserCardInfos } from "../FindAppointmentsProvider/types";

export interface TakeAppointmentModalProviderContextProps {
  selectedUser: UserCardInfos | null;
  isModalOpen: boolean;
  grids: GridNameWithId[] | undefined;
  gridInfos: GridInfos | undefined;
  gridSlots: tmpSlotsType[];
  selectedGrid: GridNameWithId | null;
  selectedSlotId: string | null;
  handleGridChange: (gridName: string) => void;
  handleOnClickSlot: (slotId: string) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnClickCard: (user: UserCardInfos | null) => void;
}

export interface TakeAppointmentModalProviderProps {
  children: ReactNode;
}

export interface GridInfos {
  slotDuration: SLOT_DURATION;
  visio: boolean;
  place: string;
  publicComment: string;
  documentId: string;
}

export interface tmpSlotsType {
  weekDay: DAY;
  day: Dayjs;
  slots: Slot[];
}

export interface GridNameWithId {
  id: number;
  name: string;
}
