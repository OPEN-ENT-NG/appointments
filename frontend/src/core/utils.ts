import dayjs, { Dayjs } from "dayjs";
import { UNIT_FILE_SIZE } from "./enums";

export const isToday = (day: Dayjs): boolean => {
  return dayjs().isSame(day, "day");
};

export const convertFileSize = (
  size: number,
  currentUnit: UNIT_FILE_SIZE,
  targetUnit: UNIT_FILE_SIZE,
): number => {
  const units = {
    [UNIT_FILE_SIZE.OCTET]: 1,
    [UNIT_FILE_SIZE.KILO_OCTET]: 1024,
    [UNIT_FILE_SIZE.MEGA_OCTET]: 1024 * 1024,
    [UNIT_FILE_SIZE.GIGA_OCTET]: 1024 * 1024 * 1024,
  };

  return (size * units[currentUnit]) / units[targetUnit];
};
