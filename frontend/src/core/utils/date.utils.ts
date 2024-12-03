import dayjs, { Dayjs } from "dayjs";

import { DAY, PERIODICITY, SLOT_DURATION } from "../enums";
import { Time, TimeObject } from "../types";

export const formatSlotDurationToMinutes = (
  duration: SLOT_DURATION,
): number => {
  switch (duration) {
    case SLOT_DURATION.FIFTEEN_MINUTES:
      return 15;
    case SLOT_DURATION.THIRTY_MINUTES:
      return 30;
    case SLOT_DURATION.FOURTYFIVE_MINUTES:
      return 45;
    case SLOT_DURATION.ONE_HOUR:
      return 60;
    default:
      return 15;
  }
};

export const formatSlotDurationToString = (duration: SLOT_DURATION): string => {
  switch (duration) {
    case SLOT_DURATION.FIFTEEN_MINUTES:
      return "00:15";
    case SLOT_DURATION.THIRTY_MINUTES:
      return "00:30";
    case SLOT_DURATION.FOURTYFIVE_MINUTES:
      return "00:45";
    case SLOT_DURATION.ONE_HOUR:
      return "01:00";
    default:
      return "00:15";
  }
};

export const parseStringToSlotDuration = (
  durationString: string,
): SLOT_DURATION => {
  switch (durationString) {
    case "00:15":
      return SLOT_DURATION.FIFTEEN_MINUTES;
    case "00:30":
      return SLOT_DURATION.THIRTY_MINUTES;
    case "00:45":
      return SLOT_DURATION.FOURTYFIVE_MINUTES;
    case "01:00":
      return SLOT_DURATION.ONE_HOUR;
    default:
      return SLOT_DURATION.FIFTEEN_MINUTES;
  }
};

export const formatDayToI18n = (day: DAY): string => {
  switch (day) {
    case DAY.MONDAY:
      return "appointments.grid.monday";
    case DAY.TUESDAY:
      return "appointments.grid.tuesday";
    case DAY.WEDNESDAY:
      return "appointments.grid.wednesday";
    case DAY.THURSDAY:
      return "appointments.grid.thursday";
    case DAY.FRIDAY:
      return "appointments.grid.friday";
    case DAY.SATURDAY:
      return "appointments.grid.saturday";
    default:
      return "";
  }
};

export const formatPeriodicityToI18n = (periodicity: PERIODICITY): string => {
  switch (periodicity) {
    case PERIODICITY.WEEKLY:
      return "appointments.grid.periodicity.weekly";
    case PERIODICITY.BIWEEKLY:
      return "appointments.grid.periodicity.biweekly";
    default:
      return "";
  }
};

export const formatDayjsToString = (date: Dayjs): string => {
  return date.format("DD/MM/YYYY");
};

export const formatTimeToDayjs = (time: TimeObject): Dayjs => {
  return dayjs()
    .set("hour", time.hour)
    .set("minute", time.minute)
    .startOf("minute");
};

export const formatTimeToString = (time: Time): string => {
  if (!time) {
    return "";
  }

  return `${time.hour.toString().padStart(2, "0")}:${time.minute
    .toString()
    .padStart(2, "0")}`;
};
