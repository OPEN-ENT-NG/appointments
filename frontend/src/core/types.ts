import { DAY } from "./enums";

export interface TimeObject {
    hour: number;
    minute: number;
}

export type Time = TimeObject | null;

export interface Slot {
    id: string;
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