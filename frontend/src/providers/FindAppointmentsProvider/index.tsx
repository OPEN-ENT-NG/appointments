import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { MIN_NB_CHAR_BEFORE_SEARCH_FOR_ADML } from "~/core/constants";
import { useGetCommunicationUsersQuery } from "~/services/api/CommunicationService";
import { UserCardInfos } from "~/services/api/CommunicationService/types";
import { useGlobal } from "../GlobalProvider";
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
  const { isConnectedUserADML } = useGlobal();
  const [search, setSearch] = useState("");
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSearchRef = useRef("");

  const {
    data: newUsers,
    isFetching,
    refetch,
  } = useGetCommunicationUsersQuery(
    {
      search,
      page,
      limit: NUMBER_MORE_USERS,
    },
    {
      skip:
        !search ||
        (isConnectedUserADML &&
          search.length < MIN_NB_CHAR_BEFORE_SEARCH_FOR_ADML),
    },
  );

  useEffect(() => {
    if (newUsers && search === lastSearchRef.current) {
      setUsers((prev) => [...prev, ...newUsers]);
      setHasMoreUsers(newUsers.length >= NUMBER_MORE_USERS);
    }
  }, [newUsers, search]);

  // Charge automatiquement plus d'utilisateurs si pas assez de résultats
  useEffect(() => {
    const minUsersNeeded = 10; // Ajuste selon ton besoin
    if (
      !isFetching &&
      hasMoreUsers &&
      users.length < minUsersNeeded &&
      search &&
      search === lastSearchRef.current
    ) {
      setPage((prev) => prev + 1);
    }
  }, [users.length, hasMoreUsers, isFetching, search]);

  const loadMoreUsers = useCallback(() => {
    if (!isFetching && hasMoreUsers) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMoreUsers]);

  const refreshSearch = useCallback(() => {
    setPage(1);
    setUsers([]);
    setHasMoreUsers(true);
  }, []);

  const handleSearch = useCallback((newSearch: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      lastSearchRef.current = newSearch;
      setSearch(newSearch);
      setPage(1);
      setUsers([]);
      setHasMoreUsers(true);
    }, 300);
  }, []);

  const resetSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    lastSearchRef.current = "";
    setSearch("");
    setPage(1);
    setUsers([]);
    setHasMoreUsers(true);
  }, []);

  const refetchSearch = useCallback(async () => {
    setPage(1);
    setUsers([]);
    setHasMoreUsers(true);
    await refetch();
  }, [refetch]);

  const value = useMemo<FindAppointmentsProviderContextProps>(
    () => ({
      users,
      hasMoreUsers,
      search,
      isFetching,
      loadMoreUsers,
      handleSearch,
      refreshSearch,
      resetSearch,
      refetchSearch,
    }),
    [
      users,
      hasMoreUsers,
      search,
      isFetching,
      loadMoreUsers,
      handleSearch,
      refreshSearch,
      resetSearch,
      refetchSearch,
    ],
  );

  return (
    <FindAppointmentsProviderContext.Provider value={value}>
      {children}
    </FindAppointmentsProviderContext.Provider>
  );
};
