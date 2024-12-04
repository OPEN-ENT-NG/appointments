import dayjs, { Dayjs } from "dayjs";

import { DAY_VALUES } from "~/core/constants";
import { DAY } from "~/core/enums";
import { Time } from "~/core/models/Time";
import { Slot } from "~/core/types";
import { TimeSlot, TimeSlots } from "~/services/api/GridService/types";
import { DaySlots } from "./types";

const transformTimeSlotToSlot = (timeSlot: TimeSlot): Slot => {
  const begin = dayjs(timeSlot.begin);
  const end = dayjs(timeSlot.end);

  const beginTime = new Time({
    hour: begin.hour(),
    minute: begin.minute(),
  });

  const endTime = new Time({
    hour: end.hour(),
    minute: end.minute(),
  });

  return {
    id: timeSlot.id,
    begin: beginTime,
    end: endTime,
  };
};

const transformStringToTime = (time: string): Time => {
  const [hour, minute] = time.split(":").map(Number);
  return new Time({ hour, minute });
};

const getDayOfWeek = (date: Dayjs): DAY => {
  return date.format("dddd").toUpperCase() as DAY;
};

export const transformTimeSlotsToDaySlots = (
  timeSlots: TimeSlots,
  currentDay: Dayjs,
): DaySlots[] => {
  const daySlots: DaySlots[] = Object.values(DAY).map((day) => ({
    weekDay: day,
    day: currentDay.startOf("week").add(DAY_VALUES[day].numberOfWeekDay, "day"),
    slots: [],
  }));

  if (!timeSlots.timeslots) {
    return daySlots;
  }

  timeSlots.timeslots.forEach((timeSlot) => {
    const [beginDate, beginTime] = timeSlot.beginDate.split(" ");
    const [endDate, endTime] = timeSlot.endDate.split(" ");
    if (beginDate !== endDate) {
      return;
    }
    const dayOfWeek = getDayOfWeek(dayjs(beginDate));
    const slot = {
      id: timeSlot.id,
      begin: transformStringToTime(beginTime),
      end: transformStringToTime(endTime),
    };

    const daySlot = daySlots.find((day) => day.weekDay === dayOfWeek);
    if (daySlot) {
      daySlot.slots.push(slot);
    }
  });

  return daySlots;
};

// export const gridsTimeSlots: Record<string, DaySlots[]> = {
//   grid1: [
//     {
//       weekDay: DAY.MONDAY,
//       day: dayjs().startOf("week").add(1, "day"), // Lundi
//       slots: [
//         {
//           id: "2023-11-20_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 15 }),
//         },
//         {
//           id: "2023-11-20_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 10, minute: 45 }),
//         },
//         {
//           id: "2023-11-20_11_0",
//           begin: new Time({ hour: 11, minute: 0 }),
//           end: new Time({ hour: 11, minute: 15 }),
//         },
//         {
//           id: "2023-11-20_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 12, minute: 15 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.TUESDAY,
//       day: dayjs().startOf("week").add(2, "day"), // Mardi
//       slots: [],
//     },
//     {
//       weekDay: DAY.WEDNESDAY,
//       day: dayjs().startOf("week").add(3, "day"), // Mercredi
//       slots: [
//         {
//           id: "2023-11-22_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 15 }),
//         },
//         {
//           id: "2023-11-22_10_0",
//           begin: new Time({ hour: 10, minute: 0 }),
//           end: new Time({ hour: 10, minute: 15 }),
//         },
//         {
//           id: "2023-11-22_19_0",
//           begin: new Time({ hour: 19, minute: 0 }),
//           end: new Time({ hour: 19, minute: 15 }),
//         },
//         {
//           id: "2023-11-22_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 15 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.THURSDAY,
//       day: dayjs().startOf("week").add(4, "day"), // Jeudi
//       slots: [
//         {
//           id: "2023-11-23_8_45",
//           begin: new Time({ hour: 8, minute: 45 }),
//           end: new Time({ hour: 9, minute: 0 }),
//         },
//         {
//           id: "2023-11-23_12_30",
//           begin: new Time({ hour: 12, minute: 30 }),
//           end: new Time({ hour: 12, minute: 45 }),
//         },
//         {
//           id: "2023-11-23_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 15 }),
//         },
//         {
//           id: "2023-11-23_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 15 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.FRIDAY,
//       day: dayjs().startOf("week").add(5, "day"), // Vendredi
//       slots: [
//         {
//           id: "2023-11-24_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 12, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 13, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_15_0",
//           begin: new Time({ hour: 15, minute: 0 }),
//           end: new Time({ hour: 15, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_17_0",
//           begin: new Time({ hour: 17, minute: 0 }),
//           end: new Time({ hour: 17, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_18_0",
//           begin: new Time({ hour: 18, minute: 0 }),
//           end: new Time({ hour: 18, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_19_0",
//           begin: new Time({ hour: 19, minute: 0 }),
//           end: new Time({ hour: 19, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_21_0",
//           begin: new Time({ hour: 21, minute: 0 }),
//           end: new Time({ hour: 21, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_22_0",
//           begin: new Time({ hour: 22, minute: 0 }),
//           end: new Time({ hour: 22, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_23_0",
//           begin: new Time({ hour: 23, minute: 0 }),
//           end: new Time({ hour: 23, minute: 15 }),
//         },
//         {
//           id: "2023-11-24_24_0",
//           begin: new Time({ hour: 24, minute: 0 }),
//           end: new Time({ hour: 24, minute: 15 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.SATURDAY,
//       day: dayjs().startOf("week").add(6, "day"), // Samedi
//       slots: [
//         {
//           id: "2023-11-25_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 10, minute: 45 }),
//         },
//         {
//           id: "2023-11-25_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 13, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_14_0",
//           begin: new Time({ hour: 14, minute: 0 }),
//           end: new Time({ hour: 14, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_15_0",
//           begin: new Time({ hour: 15, minute: 0 }),
//           end: new Time({ hour: 15, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_17_0",
//           begin: new Time({ hour: 17, minute: 0 }),
//           end: new Time({ hour: 17, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_18_0",
//           begin: new Time({ hour: 18, minute: 0 }),
//           end: new Time({ hour: 18, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_19_0",
//           begin: new Time({ hour: 19, minute: 0 }),
//           end: new Time({ hour: 19, minute: 15 }),
//         },
//         {
//           id: "2023-11-25_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 15 }),
//         },
//       ],
//     },
//   ],
//   grid2: [
//     {
//       weekDay: DAY.MONDAY,
//       day: dayjs().startOf("week").add(1, "day"), // Lundi
//       slots: [
//         {
//           id: "2023-11-20_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 30 }),
//         },
//         {
//           id: "2023-11-20_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.TUESDAY,
//       day: dayjs().startOf("week").add(2, "day"), // Mardi
//       slots: [
//         {
//           id: "2023-11-21_8_45",
//           begin: new Time({ hour: 8, minute: 45 }),
//           end: new Time({ hour: 9, minute: 15 }),
//         },
//         {
//           id: "2023-11-21_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 12, minute: 30 }),
//         },
//         {
//           id: "2023-11-21_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 30 }),
//         },
//         {
//           id: "2023-11-21_19_0",
//           begin: new Time({ hour: 19, minute: 0 }),
//           end: new Time({ hour: 19, minute: 30 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.WEDNESDAY,
//       day: dayjs().startOf("week").add(3, "day"), // Mercredi
//       slots: [
//         {
//           id: "2023-11-22_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 30 }),
//         },
//         {
//           id: "2023-11-22_10_0",
//           begin: new Time({ hour: 10, minute: 0 }),
//           end: new Time({ hour: 10, minute: 30 }),
//         },
//         {
//           id: "2023-11-22_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 12, minute: 30 }),
//         },
//         {
//           id: "2023-11-22_17_0",
//           begin: new Time({ hour: 17, minute: 0 }),
//           end: new Time({ hour: 17, minute: 30 }),
//         },
//         {
//           id: "2023-11-22_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 30 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.THURSDAY,
//       day: dayjs().startOf("week").add(4, "day"), // Jeudi
//       slots: [
//         {
//           id: "2023-11-23_8_45",
//           begin: new Time({ hour: 8, minute: 45 }),
//           end: new Time({ hour: 9, minute: 15 }),
//         },
//         {
//           id: "2023-11-23_12_30",
//           begin: new Time({ hour: 12, minute: 30 }),
//           end: new Time({ hour: 13, minute: 0 }),
//         },
//         {
//           id: "2023-11-23_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 30 }),
//         },
//         {
//           id: "2023-11-23_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 20, minute: 30 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.FRIDAY,
//       day: dayjs().startOf("week").add(5, "day"), // Vendredi
//       slots: [
//         {
//           id: "2023-11-24_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 9, minute: 30 }),
//         },
//         {
//           id: "2023-11-24_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 12, minute: 30 }),
//         },
//         {
//           id: "2023-11-24_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 13, minute: 30 }),
//         },
//         {
//           id: "2023-11-24_15_0",
//           begin: new Time({ hour: 15, minute: 0 }),
//           end: new Time({ hour: 15, minute: 30 }),
//         },
//         {
//           id: "2023-11-24_16_0",
//           begin: new Time({ hour: 16, minute: 0 }),
//           end: new Time({ hour: 16, minute: 30 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.SATURDAY,
//       day: dayjs().startOf("week").add(6, "day"), // Samedi
//       slots: [
//         {
//           id: "2023-11-25_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//         {
//           id: "2023-11-25_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 13, minute: 30 }),
//         },
//       ],
//     },
//   ],

//   grid3: [
//     {
//       weekDay: DAY.MONDAY,
//       day: dayjs().startOf("week").add(1, "day"), // Lundi
//       slots: [
//         {
//           id: "2023-11-20_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 10, minute: 0 }),
//         },
//         {
//           id: "2023-11-20_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 11, minute: 30 }),
//         },
//         {
//           id: "2023-11-20_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 13, minute: 0 }),
//         },
//         {
//           id: "2023-11-20_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 14, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.TUESDAY,
//       day: dayjs().startOf("week").add(2, "day"), // Mardi
//       slots: [
//         {
//           id: "2023-11-21_8_0",
//           begin: new Time({ hour: 8, minute: 0 }),
//           end: new Time({ hour: 9, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 10, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_17_0",
//           begin: new Time({ hour: 17, minute: 0 }),
//           end: new Time({ hour: 18, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_18_0",
//           begin: new Time({ hour: 18, minute: 0 }),
//           end: new Time({ hour: 19, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_19_0",
//           begin: new Time({ hour: 19, minute: 0 }),
//           end: new Time({ hour: 20, minute: 0 }),
//         },
//         {
//           id: "2023-11-21_20_0",
//           begin: new Time({ hour: 20, minute: 0 }),
//           end: new Time({ hour: 21, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.WEDNESDAY,
//       day: dayjs().startOf("week").add(3, "day"), // Mercredi
//       slots: [
//         {
//           id: "2023-11-22_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 10, minute: 0 }),
//         },
//         {
//           id: "2023-11-22_10_0",
//           begin: new Time({ hour: 10, minute: 0 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//         {
//           id: "2023-11-22_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 13, minute: 0 }),
//         },
//         {
//           id: "2023-11-22_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 14, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.THURSDAY,
//       day: dayjs().startOf("week").add(4, "day"), // Jeudi
//       slots: [
//         {
//           id: "2023-11-23_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 10, minute: 0 }),
//         },
//         {
//           id: "2023-11-23_10_0",
//           begin: new Time({ hour: 10, minute: 0 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//         {
//           id: "2023-11-23_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 13, minute: 0 }),
//         },
//         {
//           id: "2023-11-23_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 14, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.FRIDAY,
//       day: dayjs().startOf("week").add(5, "day"), // Vendredi
//       slots: [
//         {
//           id: "2023-11-24_9_0",
//           begin: new Time({ hour: 9, minute: 0 }),
//           end: new Time({ hour: 10, minute: 0 }),
//         },
//         {
//           id: "2023-11-24_10_0",
//           begin: new Time({ hour: 10, minute: 0 }),
//           end: new Time({ hour: 11, minute: 0 }),
//         },
//         {
//           id: "2023-11-24_11_0",
//           begin: new Time({ hour: 11, minute: 0 }),
//           end: new Time({ hour: 12, minute: 0 }),
//         },
//         {
//           id: "2023-11-24_12_0",
//           begin: new Time({ hour: 12, minute: 0 }),
//           end: new Time({ hour: 13, minute: 0 }),
//         },
//       ],
//     },
//     {
//       weekDay: DAY.SATURDAY,
//       day: dayjs().startOf("week").add(6, "day"), // Samedi
//       slots: [
//         {
//           id: "2023-11-25_10_30",
//           begin: new Time({ hour: 10, minute: 30 }),
//           end: new Time({ hour: 11, minute: 30 }),
//         },
//         {
//           id: "2023-11-25_13_0",
//           begin: new Time({ hour: 13, minute: 0 }),
//           end: new Time({ hour: 14, minute: 0 }),
//         },
//       ],
//     },
//   ],
// };
