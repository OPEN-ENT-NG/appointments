import dayjs from "dayjs";
import { DAY, SLOT_DURATION } from "~/core/enums";
import { Time, WeekSlotsModel } from "~/core/types";

export const formatTime = (time: Time): string => {
  if (!time) {
    return "--:--";
  }

  const hour = time.hour.toString().padStart(2, "0");
  const minute = time.minute.toString().padStart(2, "0");

  return `${hour}:${minute}`;
};

const isTimeInRange = (time: Time, start: Time, end: Time): boolean => {
  if (!time || !start || !end) {
    return false;
  }

  const currentTime = dayjs().set("hour", time.hour).set("minute", time.minute);
  const startTime = dayjs().set("hour", start.hour).set("minute", start.minute);
  const endTime = dayjs().set("hour", end.hour).set("minute", end.minute);

  return (
    (currentTime.isAfter(startTime) || currentTime.isSame(startTime)) &&
    currentTime.isBefore(endTime)
  );
};

export const getStartOptions = (
  day: DAY,
  weekSlots: WeekSlotsModel,
): Time[] => {
  const slots = weekSlots[day];

  const possibleTimes: Time[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      possibleTimes.push({ hour, minute });
    }
  }

  const availableTimes = possibleTimes.filter((time) => {
    return !slots.some((slot) => isTimeInRange(time, slot.begin, slot.end));
  });

  return availableTimes;
};

export const getEndOptions = (day: DAY, weekSlots: WeekSlotsModel): Time[] => {
  const slots = weekSlots[day];

  const possibleTimes: Time[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      possibleTimes.push({ hour, minute });
    }
  }

  const availableTimes = possibleTimes.filter((time) => {
    return !slots.some((slot) => isTimeInRange(time, slot.begin, slot.end));
  });

  return availableTimes;
};
