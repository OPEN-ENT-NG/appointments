import { ReactNode } from "react";

import { Dayjs } from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_STATE } from "~/core/enums";
import { GRID_TYPE } from "./enum";

export interface AvailabilityProviderContextProps {
  gridPages: GridPages;
  gridTypeLengths: GridTypeLength;
  currentGridList: GridList;
  isLoading: boolean;
  handleChangePage: (gridType: GRID_TYPE, newPage: number) => void;
}

export interface AvailabilityProviderProps {
  children: ReactNode;
}

export interface MinimalGrid {
  id: string;
  name: string;
  color: HexaColor;
  beginDate: Dayjs;
  endDate: Dayjs;
  state: GRID_STATE;
  structureId: string;
}

export interface GridList {
  [GRID_TYPE.IN_PROGRESS]: MinimalGrid[];
  [GRID_TYPE.CLOSED]: MinimalGrid[];
}

export interface GridTypeLength {
  [GRID_TYPE.IN_PROGRESS]: number;
  [GRID_TYPE.CLOSED]: number;
}

export interface GridPages {
  [GRID_TYPE.IN_PROGRESS]: number;
  [GRID_TYPE.CLOSED]: number;
}
