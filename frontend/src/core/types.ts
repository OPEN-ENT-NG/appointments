import { DAY } from "./enums";

interface Time {
    hour: number;
    minute: number;
}

export interface DailySlot {
    day: DAY;
    begin: Time;
    end: Time;
}