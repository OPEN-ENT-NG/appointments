import { MODAL_TYPE } from "./enum";

export interface DisplayModalsState {
    [MODAL_TYPE.CREATE_GRID]: boolean;
    [MODAL_TYPE.EDIT_GRID]: boolean;
    [MODAL_TYPE.CONFIRMATION]: boolean;
}