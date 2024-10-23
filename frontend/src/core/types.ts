import { DAY } from "./enums";

interface Time {
    hour: number | "--";
    minute: number | "--";
}

export interface Slot {
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