import { MODAL_TYPE } from "./enum";
import { DisplayModalsState } from "./types";

export const initialDisplayModalsState: DisplayModalsState = {
  [MODAL_TYPE.CREATE_GRID]: false,
  [MODAL_TYPE.EDIT_GRID]: false,
  [MODAL_TYPE.CONFIRMATION]: false,
};
