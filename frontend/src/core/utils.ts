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

export const getDatePlusOneWeek = (startDate: Date) => {
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);
  endDate.setHours(0);
  endDate.setMinutes(0);
  endDate.setSeconds(0);
  return endDate;
};

export const getDatePlusOneDay = (startDate: Date) => {
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 1);
  endDate.setHours(0);
  endDate.setMinutes(0);
  endDate.setSeconds(0);
  return endDate;
};

// Other

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const hexWithOpacity = (
  hex: string,
  opacityPercentTarget: number,
): string => {
  const opacityTarget = opacityPercentTarget / 100;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Mélange avec blanc (255, 255, 255)
  const blended = (channel: number) =>
    Math.round(channel * opacityTarget + 255 * (1 - opacityTarget));

  return `#${[r, g, b]
    .map(blended)
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
};
