import { Dayjs } from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { DAY, DURATION, GRID_STATE, PERIODICITY } from "~/core/enums";
import { TimeObject } from "~/core/models/Time/types";
import { Structure } from "~/hooks/types";
import { Public } from "../CommunicationService/types";

interface DailySlotPayload {
  day: DAY;
  beginTime: string;
  endTime: string;
}

export interface CreateGridPayload {
  name: string;
  color: string;
  beginDate: string;
  endDate: string;
  structureId: string;
  duration: string;
  periodicity: number;
  targetPublicListId: string[];
  dailySlots: DailySlotPayload[];
  videoCallLink: string;
  place: string;
  documentId: string;
  publicComment: string;
}

export interface GetMyGridsPayload {
  states: GRID_STATE[];
  page: number;
  limit: number;
}

export interface MyGridsResponse {
  total: number;
  minimalCreatorGrids: Array<{
    id: number;
    name: string;
    color: HexaColor;
    beginDate: string;
    endDate: string;
    structureId: string;
    state: GRID_STATE;
  }>;
}

export interface MinimalGrid extends NameWithId {
  color: HexaColor;
  beginDate: Dayjs;
  endDate: Dayjs;
  state: GRID_STATE;
  structureId: string;
}

export interface MyGrids {
  grids: MinimalGrid[];
  total: number;
}

export interface NameWithId {
  id: number;
  name: string;
}

export interface GridInfos {
  duration: DURATION;
  videoCallLink: string;
  place: string;
  publicComment: string;
  documentId: string;
}

export interface TimeSlot {
  id: number;
  beginDate: string; // format YYYY-MM-DD HH:mm
  endDate: string; // format YYYY-MM-DD HH:mm
}

export interface TimeSlots {
  timeslots: TimeSlot[] | null;
  nextAvailableTimeSlot: TimeSlot | null;
}

export interface GetTimeSlotsPayload {
  gridId: number;
  beginDate: string;
  endDate: string;
}

export interface UpdateGridStatePayload {
  gridId: number;
  deleteAppointments: boolean;
}

interface DailySlot {
  id: number;
  day: DAY;
  beginTime: TimeObject;
  endTime: TimeObject;
}

export interface GetGridByIdResponse {
  id: number;
  name: string;
  color: HexaColor;
  beginDate: string;
  endDate: string;
  structure: Structure;
  duration: DURATION;
  periodicity: PERIODICITY;
  public: Public[];
  videoCallLink: string;
  place: string;
  documentId: string;
  publicComment: string;
  dailySlots: DailySlot[];
}
