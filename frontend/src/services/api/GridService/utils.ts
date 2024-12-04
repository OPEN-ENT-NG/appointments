import dayjs from "dayjs";

import { MyGrids } from "./types";

export const transformResponseToMyGridsResponse = (response: any): MyGrids => {
  return {
    total: response.total,
    grids: response.minimal_creator_grids.map((grid: any) => ({
      ...grid,
      beginDate: dayjs(grid.begin_date),
      endDate: dayjs(grid.end_date),
    })),
  };
};
