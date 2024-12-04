import { HexaColor } from "~/components/ColorPicker/types";
import { DAY, DURATION, GRID_STATE } from "~/core/enums";

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
  visioLink: string;
  place: string;
  documentId: string;
  publicComment: string;
}

export interface GetMyGridsPayload {
  states: GRID_STATE[];
  page: number;
  limit: number;
}

export interface MinimalGrid extends NameWithId {
  color: HexaColor;
  beginDate: string;
  endDate: string;
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
  visioLink: string;
  place: string;
  publicComment: string;
  documentId: string;
}

export interface TimeSlot {
  id: number;
  begin: string;
  end: string;
}

export interface TimeSlots {
  timeSlots: TimeSlot[] | null;
  nextAvailableTimeSlot: TimeSlot | null;
}

export interface GetTimeSlotsPayload {
  gridId: number;
  beginDate: string;
  endDate: string;
}
