import dayjs from "dayjs";

import { GridInfoType } from "./types";
import { DaySlotsProps } from "~/components/DaySlots/types";
import { DAY, SLOT_DURATION } from "~/core/enums";


export const gridsName = ["grid1", "grid2", "grid3"];

export const gridsInfos: Record<string, GridInfoType> = {
  grid1: {
    visio: true,
    slotDuration: SLOT_DURATION.FIFTEEN_MINUTES,
    location: "Paris",
    publicComment: "Public comment grille 1",
  },
  grid2: {
    visio: false,
    slotDuration: SLOT_DURATION.THIRTY_MINUTES,
    location: "Lyon",
    publicComment: "Public comment grille 2",
  },
  grid3: {
    visio: true,
    slotDuration: SLOT_DURATION.THIRTY_MINUTES,
    location: "Marseille",
    publicComment: "Public comment grille 3",
  },
};

export const gridsTimeSlots: Record<string, DaySlotsProps[]> = {
  grid1: [
    {
      weekDay: DAY.MONDAY,
      day: dayjs().startOf("week").add(1, "day"), // Lundi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 30 },
        { hour: 11, minute: 0 },
        { hour: 12, minute: 0 },
      ],
    },
    {
      weekDay: DAY.TUESDAY,
      day: dayjs().startOf("week").add(2, "day"), // Mardi
      slots: [
      ],
    },
    {
      weekDay: DAY.WEDNESDAY,
      day: dayjs().startOf("week").add(3, "day"), // Mercredi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.THURSDAY,
      day: dayjs().startOf("week").add(4, "day"), // Jeudi
      slots: [
        { hour: 8, minute: 45 },
        { hour: 12, minute: 30 },
        { hour: 16, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.FRIDAY,
      day: dayjs().startOf("week").add(5, "day"), // Vendredi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 12, minute: 0 },
        { hour: 13, minute: 0 },
        { hour: 15, minute: 0 },
        { hour: 16, minute: 0 },
        { hour: 17, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
        { hour: 9, minute: 0 },
        { hour: 10, minute: 30 },
        { hour: 11, minute: 0 },
        { hour: 12, minute: 0 },
        { hour: 13, minute: 0 },
        { hour: 14, minute: 0 },
        { hour: 15, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.SATURDAY,
      day: dayjs().startOf("week").add(6, "day"), // Samedi
      slots: [
        { hour: 10, minute: 30 },
        { hour: 13, minute: 0 },
      ],
    },
  ],
  grid2: [
    {
      weekDay: DAY.MONDAY,
      day: dayjs().startOf("week").add(1, "day"), // Lundi
      slots: [
      ],
    },
    {
      weekDay: DAY.TUESDAY,
      day: dayjs().startOf("week").add(2, "day"), // Mardi
      slots: [
      ],
    },
    {
      weekDay: DAY.WEDNESDAY,
      day: dayjs().startOf("week").add(3, "day"), // Mercredi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 0 },
        { hour: 11, minute: 0 },
        { hour: 12, minute: 0 },
        { hour: 13, minute: 0 },
        { hour: 17, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.THURSDAY,
      day: dayjs().startOf("week").add(4, "day"), // Jeudi
      slots: [
        { hour: 8, minute: 45 },
        { hour: 12, minute: 30 },
        { hour: 16, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.FRIDAY,
      day: dayjs().startOf("week").add(5, "day"), // Vendredi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 30 },
        { hour: 11, minute: 0 },
        { hour: 15, minute: 0 },
        { hour: 16, minute: 0 },
      ],
    },
    {
      weekDay: DAY.SATURDAY,
      day: dayjs().startOf("week").add(6, "day"), // Samedi
      slots: [
        { hour: 10, minute: 30 },
        { hour: 13, minute: 0 },
      ],
    },
  ],
  grid3: [
    {
      weekDay: DAY.MONDAY,
      day: dayjs().startOf("week").add(1, "day"), // Lundi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 30 },
        { hour: 11, minute: 0 },
        { hour: 12, minute: 0 },
        { hour: 13, minute: 0 },
      ],
    },
    {
      weekDay: DAY.TUESDAY,
      day: dayjs().startOf("week").add(2, "day"), // Mardi
      slots: [
        { hour: 8, minute: 0 },
        { hour: 9, minute: 0 },
        { hour: 17, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.WEDNESDAY,
      day: dayjs().startOf("week").add(3, "day"), // Mercredi
      slots: [
        { hour: 9, minute: 0 },
        { hour: 10, minute: 0 },
        { hour: 11, minute: 0 },
        { hour: 17, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.THURSDAY,
      day: dayjs().startOf("week").add(4, "day"), // Jeudi
      slots: [
        { hour: 8, minute: 45 },
        { hour: 12, minute: 30 },
        { hour: 16, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 19, minute: 0 },
        { hour: 20, minute: 0 },
      ],
    },
    {
      weekDay: DAY.FRIDAY,
      day: dayjs().startOf("week").add(5, "day"), // Vendredi
      slots: [
      ],
    },
    {
      weekDay: DAY.SATURDAY,
      day: dayjs().startOf("week").add(6, "day"), // Samedi
      slots: [
        { hour: 10, minute: 30 },
        { hour: 13, minute: 0 },
      ],
    },
  ],
};
