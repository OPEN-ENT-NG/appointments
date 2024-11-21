import { Dayjs } from "dayjs";

import { DAY } from "~/core/enums";
import { Slot } from "~/core/types";

export interface DaySlotsProps {
  weekDay: DAY;
  day: Dayjs;
  slots: Slot[];
}

export interface DaySlotsWrapperProps {
  isEmpty: boolean;
}

export interface TimeSlotProps {
  selected: boolean;
}
