import { DAY, DURATION, PERIODICITY } from "./enums";

export const GRID_PER_PAGE = 5;

export const MAX_STRING_LENGTH = 250;

export const DURATION_VALUES = {
  [DURATION.FIFTEEN_MINUTES]: {
    displayValue: "15 min",
    numberOfMinutes: 15,
  },
  [DURATION.THIRTY_MINUTES]: {
    displayValue: "30 min",
    numberOfMinutes: 30,
  },
  [DURATION.FOURTYFIVE_MINUTES]: {
    displayValue: "45 min",
    numberOfMinutes: 45,
  },
  [DURATION.ONE_HOUR]: {
    displayValue: "1 h",
    numberOfMinutes: 60,
  },
};

export const DAY_VALUES = {
  [DAY.MONDAY]: {
    value: "monday",
    i18nKey: "appointments.monday",
  },
  [DAY.TUESDAY]: {
    value: "tuesday",
    i18nKey: "appointments.tuesday",
  },
  [DAY.WEDNESDAY]: {
    value: "wednesday",
    i18nKey: "appointments.wednesday",
  },
  [DAY.THURSDAY]: {
    value: "thursday",
    i18nKey: "appointments.thursday",
  },
  [DAY.FRIDAY]: {
    value: "friday",
    i18nKey: "appointments.friday",
  },
  [DAY.SATURDAY]: {
    value: "saturday",
    i18nKey: "appointments.saturday",
  },
};

export const PERIODICITY_VALUES = {
  [PERIODICITY.WEEKLY]: {
    i18nKey: "appointments.grid.periodicity.weekly",
  },
  [PERIODICITY.BIWEEKLY]: {
    i18nKey: "appointments.grid.periodicity.biweekly",
  },
};
