import { ReactNode } from "react";

export interface FindAppointmentsProviderContextProps {
  users: UserCardInfos[];
  hasMoreUsers: boolean;
  search: string;
  loadMoreUsers: () => void;
  handleSearch: (newSearch: string) => void;
}

export interface FindAppointmentsProviderProps {
  children: ReactNode;
}

export interface GetUsersPayload {
  search: string;
  page: number;
  limit: number;
}
