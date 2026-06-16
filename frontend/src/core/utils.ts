import dayjs, { Dayjs } from "dayjs";
import { DAY } from "./dayjs.const";

// DayJS

export const isToday = (day: Dayjs): boolean => {
  return dayjs().isSame(day, DAY);
};

export const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

// Dates

export const getDayName = (date: Date, localeCode: string) => {
  const dayName = date.toLocaleDateString(localeCode, { weekday: "long" });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};

export const getDayNumberAndMonthName = (date: Date, localeCode: string) => {
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString(localeCode, { month: "long" });
  return `${dayNumber} ${monthName}`;
};


// Other

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
