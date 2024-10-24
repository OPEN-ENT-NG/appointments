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

export const initialGridModalInputs = (structure: Structure): GridModalInputs => ({
    name: "",
    color: "#f44336",
    structure: structure,
    location: "",
    public: [{ id: "all", name: "All" }],
    isVisio: false,
    visioLink: "",
    publicComment: "",
    validityPeriod: {
      start: new Date(),
      end: new Date(),
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

