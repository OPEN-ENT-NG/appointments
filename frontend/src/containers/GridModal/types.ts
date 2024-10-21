import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_MODAL_TYPE } from "./enum";
import { slotDuration } from "~/core/constants/enums";
import { DailySlot } from "~/core/types";
import { PERIODICITY } from "~/core/enums";

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

export interface SecondPageInputs {
  validityPeriod: {
    start: Date;
    end: Date;
  };
  slotDuration: slotDuration;
  periodicity: PERIODICITY;
  dailySlots: DailySlot[];
}

