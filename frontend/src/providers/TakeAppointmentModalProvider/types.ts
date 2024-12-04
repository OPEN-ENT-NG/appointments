import { Dispatch, ReactNode, SetStateAction } from "react";

import { Dayjs } from "dayjs";

import { DAY } from "~/core/enums";
import { Slot } from "~/core/types";
import { UserCardInfos } from "~/services/api/CommunicationService/types";
import { GridInfos } from "~/services/api/GridService/types";

export interface TakeAppointmentModalProviderContextProps {
  selectedUser: UserCardInfos | null;
  isModalOpen: boolean;
  grids: GridNameWithId[] | undefined;
  gridInfos: GridInfos | undefined;
  gridSlots: DaySlots[];
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

export interface DaySlots {
  weekDay: DAY;
  day: Dayjs;
  slots: Slot[];
}

export interface GridNameWithId {
  id: number;
  name: string;
}

export interface TimeSlot {
  id: number;
  gridId: number;
  begin: string;
  end: string;
}

export interface TimeSlots {
  timeSlots: TimeSlot[];
  nextAvailableTimeSlot: TimeSlot | null;
}

export interface GetTimeSlotPayload {
  gridId: number;
  beginDate: string;
  endDate: string;
}
