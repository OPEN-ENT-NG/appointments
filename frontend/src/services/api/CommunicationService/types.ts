import { Dayjs } from "dayjs";

export interface UserCardInfos {
  userId: string;
  picture: string | null;
  displayName: string;
  functions: string[];
  lastAppointmentDate: Dayjs | null;
  isAvailable: boolean;
}

export interface GetUsersPayload {
  search: string;
  limit: number;
}
