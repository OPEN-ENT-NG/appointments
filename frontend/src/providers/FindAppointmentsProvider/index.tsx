import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useGetCommunicationUsersQuery } from "~/services/api/CommunicationService";
import { UserCardInfos } from "~/services/api/CommunicationService/types";
import {
  FindAppointmentsProviderContextProps,
  FindAppointmentsProviderProps,
} from "./types";
import { NUMBER_MORE_USERS } from "./utils";

const FindAppointmentsProviderContext =
  createContext<FindAppointmentsProviderContextProps | null>(null);

export const useFindAppointments = () => {
  const context = useContext(FindAppointmentsProviderContext);
  if (!context) {
    throw new Error(
      "useFindAppointments must be used within a FindAppointmentsProvider",
    );
  }
  return context;
};

export const FindAppointmentsProvider: FC<FindAppointmentsProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserCardInfos[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const { data: newUsers } = useGetCommunicationUsersQuery(
    {
      search,
      page,
      limit: NUMBER_MORE_USERS,
    },
    { skip: !search },
  );

  // first load
  useEffect(() => {
    if (!users.length && newUsers && search) {
      setUsers(newUsers);
      setPage((prev) => prev + 1);
    }
  }, [newUsers]);

  const loadMoreUsers = () => {
    setPage((prev) => prev + 1);
    if (!newUsers) {
      setHasMoreUsers(false);
      return;
    }
    setUsers((prev) => [...prev, ...newUsers]);
  };

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
    setUsers([]);
    setHasMoreUsers(true);
  };

  const resetSearch = () => {
    setSearch("");
    refreshSearch();
  };

  const refreshSearch = () => {
    setPage(1);
    setUsers([]);
    setHasMoreUsers(true);
  };

  const value = useMemo<FindAppointmentsProviderContextProps>(
    () => ({
      users,
      hasMoreUsers,
      search,
      loadMoreUsers,
      handleSearch,
      refreshSearch,
      resetSearch,
    }),
    [users, hasMoreUsers],
  );
  return (
    <FindAppointmentsProviderContext.Provider value={value}>
      {children}
    </FindAppointmentsProviderContext.Provider>
  );
};
