import { TimeView } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";

import { DAY, HOUR, MINUTE } from "~/core/dayjs.const";
import { TIMEPICKER_VIEW } from "~/core/enums";
import { Time } from "~/core/models/Time";
import { Slot } from "~/core/types";
import { t } from "~/i18n";
import { IDurationProps } from "~/providers/GridModalProvider/types";
import { ICandidates } from "./types";

dayjs.extend(duration);
dayjs.extend(isBetween);

export const isTimeInRange = (
  time: Dayjs,
  start: Dayjs,
  end: Dayjs,
): boolean => {
  if (!time || !start || !end) {
    return false;
  }
  return time.isAfter(start) && time.isBefore(end);
};

export const getNbMinutesOfduration = (duration: IDurationProps): number => {
  return duration.hours * 60 + duration.minutes;
};

const getNbMinutesFromMidnight = (value: Dayjs): number => {
  return value.hour() * 60 + value.minute();
};

export const getExtremumTimes = (duration: IDurationProps) => {
  const maxStarTimeHours = 22 - duration.hours - 1;
  const maxStarTimeMinutes = 60 - duration.minutes;
  const beginMax = dayjs()
    .startOf(DAY)
    .add(maxStarTimeHours, HOUR)
    .add(maxStarTimeMinutes, MINUTE);

  return {
    beginMin: dayjs().startOf(DAY).add(7, HOUR),
    beginMax,
    endMin: dayjs()
      .startOf(DAY)
      .add(7 + duration.hours, HOUR)
      .add(duration.minutes, MINUTE),
    endMax: dayjs().startOf(DAY).add(22, HOUR),
  };
};

export const getEndMinTime = (
  beginTime: Dayjs | null,
  duration: IDurationProps,
): Dayjs | null => {
  if (!beginTime) return null;
  return beginTime.add(duration.hours, HOUR).add(duration.minutes, MINUTE);
};

export const wouldCandidatesOverlapSlot = (
  candidateStart: Dayjs,
  candidateEnd: Dayjs,
  siblingsSlots: Slot[],
): boolean => {
  return siblingsSlots.some((slot) => {
    const start = slot.begin.parseToDayjsOrDefault(null);
    const end = slot.end.parseToDayjsOrDefault(null);

    return candidateStart.isBefore(end) && candidateEnd.isAfter(start);
  });
};

export const wouldOverlapExistingSlot = (
  candidate: Dayjs,
  siblingsSlots: Slot[],
  slotDurationMinutes: number,
  isCandidateStart: boolean = true,
): boolean => {
  const candidates: ICandidates = {
    start: dayjs(),
    end: dayjs(),
  };
  candidates.start = isCandidateStart
    ? candidate
    : candidate.subtract(slotDurationMinutes, "minute");
  candidates.end = isCandidateStart
    ? candidate.add(slotDurationMinutes, "minute")
    : candidate;
  return wouldCandidatesOverlapSlot(
    candidates.start,
    candidates.end,
    siblingsSlots,
  );
};

export const shouldDisableThisStartValue = (
  value: Dayjs,
  siblingsSlots: Slot[],
  view: TimeView,
  slotDurationMinutes: number, // durée du créneau en cours de création
): boolean => {
  switch (view.toString().toUpperCase()) {
    case TIMEPICKER_VIEW.HOURS:
      // Given hour is disabled if ALL possible minutes conflict
      return Array.from({ length: 12 }, (_, i) => i * 5).every((m) =>
        wouldOverlapExistingSlot(
          value.minute(m),
          siblingsSlots,
          slotDurationMinutes,
        ),
      );
    case TIMEPICKER_VIEW.MINUTES:
      return wouldOverlapExistingSlot(
        value,
        siblingsSlots,
        slotDurationMinutes,
      );
    default:
      return false;
  }
};

export const shouldDisableThisEndValue = (
  value: Dayjs,
  slotStart: Dayjs,
  duration: IDurationProps,
  endMax: Dayjs,
  siblingsSlots: Slot[],
  view: TimeView,
): boolean => {
  const nbBeginTimeMinutes = getNbMinutesFromMidnight(slotStart);
  const nbDurationMinutes = getNbMinutesOfduration(duration);
  const nbValueMinutes = getNbMinutesFromMidnight(value);

  const nextSlotStart = siblingsSlots
    .map((slot) => dayjs(slot.begin.parseToDayjsOrDefault(null)))
    .filter((s) => s.isAfter(slotStart))
    .sort((a, b) => a.diff(b))[0];

  const effectiveEndMax = nextSlotStart?.isBefore(endMax)
    ? nextSlotStart
    : endMax;
  const effectiveEndMaxMinutes = getNbMinutesFromMidnight(effectiveEndMax);

  const isValidMultiple = (nbMinutes: number): boolean =>
    (nbMinutes - nbBeginTimeMinutes) % nbDurationMinutes === 0 &&
    nbMinutes > nbBeginTimeMinutes;

  switch (view.toString().toUpperCase()) {
    case TIMEPICKER_VIEW.HOURS: {
      const hourMinutes = Array.from({ length: 12 }, (_, i) => i * 5);
      return hourMinutes.every((m) => {
        const totalMinutes = value.hour() * 60 + m;
        return (
          !isValidMultiple(totalMinutes) ||
          totalMinutes > effectiveEndMaxMinutes
        );
      });
    }
    case TIMEPICKER_VIEW.MINUTES: {
      return (
        !isValidMultiple(nbValueMinutes) ||
        nbValueMinutes > effectiveEndMaxMinutes
      );
    }
    default:
      return false;
  }
};

export const shouldDisplayHelperText = (
  beginTime: Time,
  endTime: Time,
  duration: IDurationProps,
): boolean => {
  const nbBeginTimeMinutes = beginTime.getNbMinutesFromMidnight();
  const nbEndTimeMinutes = endTime.getNbMinutesFromMidnight();
  const nbDurationMinutes = getNbMinutesOfduration(duration);
  return (nbEndTimeMinutes - nbBeginTimeMinutes) % nbDurationMinutes !== 0;
};

export const getErrorHelperText = (
  beginTime: Time,
  duration: IDurationProps,
): string => {
  return t("appointments.error.slot.time.end", {
    duration: `${duration.hours}h${duration.minutes
      .toString()
      .padStart(2, "0")}min`,
    startTime: beginTime.parseToDisplayText(),
  });
};
