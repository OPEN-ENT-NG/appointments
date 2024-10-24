import { DAY } from "./enums";

interface Time {
    hour: number | null;
    minute: number | null;
}

export interface Slot {
    id: uu
    begin: Time;
    end: Time;
}

export interface WeekSlotsModel {
    [DAY.MONDAY]: Slot[];
    [DAY.TUESDAY]: Slot[];
    [DAY.WEDNESDAY]: Slot[];
    [DAY.THURSDAY]: Slot[];
    [DAY.FRIDAY]: Slot[];
    [DAY.SATURDAY]: Slot[];
}