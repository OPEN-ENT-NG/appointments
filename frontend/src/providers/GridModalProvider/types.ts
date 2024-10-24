import { Dayjs } from "dayjs";
import { HexaColor } from "~/components/ColorPicker/types";
import { PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { WeekSlotsModel } from "~/core/types";


export interface GridModalProviderContextProps {
  inputs: GridModalInputs;
  setInputs: (inputs: GridModalInputs) => void;
  structureOptions: Structure[];
  publicOptions: Public[];
  slotDurationOptions: SLOT_DURATION[];
  periodicityOptions: PERIODICITY[];
}

export interface GridModalProviderProps {
  children: React.ReactNode;
}

export interface Structure {
  id: string;
  name: string;
}

export interface Public {
  id: string;
  name: string;
}

export interface GridModalInputs {
  name: string;
  color: HexaColor;
  structure: Structure;
  location: string;
  public: Public[];
  isVisio: boolean;
  visioLink: string;
  publicComment: string;
  validityPeriod: {
    start: Dayjs | null;
    end: Dayjs | null;
  };
  slotDuration: SLOT_DURATION;
  periodicity: PERIODICITY;
  weekSlots: WeekSlotsModel;
}