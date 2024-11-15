import { Dayjs } from "dayjs";

import { DAY } from "~/core/enums";
import { TimeObject } from "~/core/types";

export interface DaySlotsProps {
  weekDay: DAY;
  day: Dayjs;
  slots: TimeObject[];
}

export interface DaySlotsWrapperProps {
  isEmpty: boolean;
}
