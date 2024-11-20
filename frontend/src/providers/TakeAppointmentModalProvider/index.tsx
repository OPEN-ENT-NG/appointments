import { createContext, FC, useContext, useMemo, useState } from "react";

import {
  TakeAppointmentModalProviderContextProps,
  TakeAppointmentModalProviderProps,
} from "./types";
import { gridsInfos, gridsName, gridsTimeSlots } from "./utils";
import { UserCardInfos } from "../FindAppointmentsProvider/types";

const TakeAppointmentModalProviderContext =
  createContext<TakeAppointmentModalProviderContextProps | null>(null);

export const useTakeAppointmentModalProvider = () => {
  const context = useContext(TakeAppointmentModalProviderContext);
  if (!context) {
    throw new Error(
      "useTakeAppointmentModalProvider must be used within a TakeAppointmentModalProvider",
    );
  }
  return context;
};

export const TakeAppointmentModalProvider: FC<
  TakeAppointmentModalProviderProps
> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<UserCardInfos | null>(null);
  const [selectedGridName, setSelectedGridName] = useState<string>(
    gridsName[0],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClickCard = (user: UserCardInfos | null) => {
    setSelectedUser(user);
    if (user) setIsModalOpen(true);
  };

  const gridInfo = useMemo(() => {
    return gridsInfos[selectedGridName];
  }, [selectedGridName]);

  const gridSlots = useMemo(() => {
    return gridsTimeSlots[selectedGridName];
  }, [selectedGridName]);

  const value = useMemo<TakeAppointmentModalProviderContextProps>(
    () => ({
      selectedUser,
      isModalOpen,
      gridsName,
      gridInfo,
      gridSlots,
      selectedGridName,
      setSelectedGridName,
      setIsModalOpen,
      handleOnClickCard,
    }),
    [
      isModalOpen,
      selectedUser,
      gridsName,
      selectedGridName,
      gridInfo,
      gridSlots,
    ],
  );
  return (
    <TakeAppointmentModalProviderContext.Provider value={value}>
      {children}
    </TakeAppointmentModalProviderContext.Provider>
  );
};
