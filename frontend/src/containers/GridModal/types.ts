import { GRID_MODAL_TYPE } from "./enum";

export interface GridModalProps {
  isOpen: boolean;
  handleClose: () => void;
  gridModalType: GRID_MODAL_TYPE;
}
