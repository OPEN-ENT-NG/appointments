import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_MODAL_TYPE } from "./enum";

export interface GridModalProps {
  isOpen: boolean;
  handleClose: () => void;
  gridModalType: GRID_MODAL_TYPE;
}

export interface Structure {
  id: string;
  name: string;
}

export interface Public {
  id: string;
  name: string;
}

export interface FirstPageInputs {
  name: string;
  color: HexaColor;
  structure: Structure;
  location: string;
  public: Public[];
  isVisio: boolean;
  visioLink: string;
  publicComment: string;
}

