import { Dispatch, ReactNode, SetStateAction } from "react";

import { Dayjs } from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { WeekSlotsModel } from "~/core/types";
import {
  Structure,
  useBlurGridInputsReturnType,
  useUpdateGridInputsReturnType,
} from "~/hooks/types";

export interface GridModalProviderContextProps {
  inputs: GridModalInputs;
  setInputs: Dispatch<SetStateAction<GridModalInputs>>;
  errorInputs: InputsErrors;
  setErrorInputs: Dispatch<SetStateAction<InputsErrors>>;
  existingGridsNames: string[];
  structureOptions: Structure[];
  publicOptions: Public[];
  slotDurationOptions: SLOT_DURATION[];
  periodicityOptions: PERIODICITY[];
  updateGridModalInputs: useUpdateGridInputsReturnType;
  blurGridModalInputs: useBlurGridInputsReturnType;
  updateFirstPageErrors: () => void;
  resetInputs: () => void;
}

export interface GridModalProviderProps {
  children: ReactNode;
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
    start: Dayjs | undefined;
    end: Dayjs | undefined;
  };
  slotDuration: SLOT_DURATION;
  periodicity: PERIODICITY;
  weekSlots: WeekSlotsModel;
}

export interface InputsErrors {
  name: string;
  visioLink: string;
  validityPeriod: string;
  weekSlots: string;
  slots: {
    ids: string[];
    error: string;
  };
}
