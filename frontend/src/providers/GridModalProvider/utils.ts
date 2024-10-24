import { DAY, PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { GridModalInputs, Structure } from "./types";
import { IUserInfo } from "edifice-ts-client";

export const userStructures = (userInfo: IUserInfo): Structure[] => {
    if (userInfo.structures.length !== userInfo.structureNames.length) {
      throw new Error('Structures and structureNames arrays must have the same length');
    }

    return userInfo.structures.map((structureId, index) => ({
      id: structureId,
      name: userInfo.structureNames[index],
    }));
  };

export const initialGridModalInputs = (structures: Structure[]): GridModalInputs => ({
    name: "",
    color: "#f44336",
    structure: structures.length ? structures[0] : { id: "", name: "" },
    location: "",
    public: [],
    isVisio: false,
    visioLink: "",
    publicComment: "",
    validityPeriod: {
      start: null,
      end: null,
    },
    slotDuration: SLOT_DURATION.FIVETEEN_MINUTES,
    periodicity: PERIODICITY.WEEKLY,
    weekSlots: {
        [DAY.MONDAY]: [],
        [DAY.TUESDAY]: [],
        [DAY.WEDNESDAY]: [],
        [DAY.THURSDAY]: [],
        [DAY.FRIDAY]: [],
        [DAY.SATURDAY]: [],
    },
  });

