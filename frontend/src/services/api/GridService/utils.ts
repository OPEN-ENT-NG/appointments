import dayjs from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_STATE } from "~/core/enums";
import { MyGrids } from "./types";

export const transformResponseToMyGridsResponse = (response: any): MyGrids => {
  return {
    total: response.total,
    grids: response.minimal_creator_grids.map((grid: any) => ({
      id: grid.id,
      name: grid.name,
      color: grid.color as HexaColor,
      beginDate: dayjs(grid.begin_date),
      endDate: dayjs(grid.end_date),
      state: grid.state as GRID_STATE,
      structureId: grid.structure_id.toString(),
    })),
  };
};

// export const transformResponseToGridInfos = (response: any)
