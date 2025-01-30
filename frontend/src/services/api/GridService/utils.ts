import dayjs from "dayjs";

import { DAY } from "~/core/enums";
import { Time } from "~/core/models/Time";
import { WeekSlotsModel } from "~/core/types";
import { GridModalInputs } from "~/providers/GridModalProvider/types";
import { GetGridByIdResponse, MyGrids, MyGridsResponse } from "./types";

export const transformResponseToMyGridsResponse = (
  response: MyGridsResponse,
): MyGrids => {
  const myGrids: MyGrids = {
    total: response.total,
    grids: response.minimalCreatorGrids.map((grid) => ({
      ...grid,
      beginDate: dayjs(grid.beginDate),
      endDate: dayjs(grid.endDate),
    })),
  };
  return myGrids;
};

export const transformResponseToCompleteGridResponse = (
  response: GetGridByIdResponse,
): GridModalInputs => {
  return {
    name: response.name,
    color: response.color,
    structure: response.structure,
    location: response.place,
    public: response.public,
    isVideoCall: !!response.videoCallLink,
    videoCallLink: response.videoCallLink,
    publicComment: response.publicComment,
    validityPeriod: {
      start: dayjs(response.beginDate),
      end: dayjs(response.endDate),
    },
    duration: response.duration,
    periodicity: response.periodicity,
    weekSlots: response.dailySlots.reduce(
      (acc, dailySlot) => {
        acc[dailySlot.day] = [
          ...(acc[dailySlot.day] || []),
          {
            id: dailySlot.id,
            begin: new Time(dailySlot.beginTime),
            end: new Time(dailySlot.endTime),
          },
        ];
        return acc;
      },
      {
        [DAY.MONDAY]: [],
        [DAY.TUESDAY]: [],
        [DAY.WEDNESDAY]: [],
        [DAY.THURSDAY]: [],
        [DAY.FRIDAY]: [],
        [DAY.SATURDAY]: [],
      } as WeekSlotsModel,
    ),
  };
};
