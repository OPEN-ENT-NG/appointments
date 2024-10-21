import { IUserInfo } from "edifice-ts-client";
import { FirstPageInputs, Public, Structure } from "./types";


export const userStructures = (userInfo: IUserInfo): Structure[] => {
    if (userInfo.structures.length !== userInfo.structureNames.length) {
      throw new Error('Structures and structureNames arrays must have the same length');
    }

    return userInfo.structures.map((structureId, index) => ({
      id: structureId,
      name: userInfo.structureNames[index],
    }));
  };
  
export const allPublic : Public = {
    id: "all",
    name: "All",
  };

export const initialFirstPageInputs = (structures: Structure[]): FirstPageInputs => ({
    name: "",
    color: "#f44336",
    structure: structures.length ? structures[0] : { id: "", name: "" },
    location: "",
    public: [allPublic],
    isVisio: false,
    visioLink: "",
    publicComment: "",
  });