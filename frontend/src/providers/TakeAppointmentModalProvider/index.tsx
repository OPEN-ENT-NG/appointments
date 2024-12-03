import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useGetAvailableUserMinimalGridsQuery } from "~/services/api/grid.service";
import { UserCardInfos } from "../FindAppointmentsProvider/types";
import {
  GridNameWithId,
  TakeAppointmentModalProviderContextProps,
  TakeAppointmentModalProviderProps,
} from "./types";
import { gridsInfos, gridsTimeSlots } from "./utils";

const TakeAppointmentModalProviderContext =
  createContext<TakeAppointmentModalProviderContextProps | null>(null);

export const useTakeAppointmentModal = () => {
  const context = useContext(TakeAppointmentModalProviderContext);
  if (!context) {
    throw new Error(
      "useTakeAppointmentModal must be used within a TakeAppointmentModalProvider",
    );
  }
  return context;
};

export const TakeAppointmentModalProvider: FC<
  TakeAppointmentModalProviderProps
> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<UserCardInfos | null>(null);
  const { data: grids } = useGetAvailableUserMinimalGridsQuery(
    selectedUser?.userId ?? "",
    { skip: !selectedUser?.userId },
  );
  const [selectedGrid, setSelectedGrid] = useState<GridNameWithId | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClickCard = (user: UserCardInfos | null) => {
    setSelectedUser(user);
    if (user) setIsModalOpen(true);
  };

  const handleOnClickSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  const handleGridChange = (gridName: string) => {
    setSelectedGrid(grids?.find((grid) => grid.name === gridName));
    setSelectedSlotId(null);
  };

  const gridInfo = useMemo(() => {
    return gridsInfos["grid1"];
  }, [selectedGrid]);

  const gridSlots = useMemo(() => {
    return gridsTimeSlots["grid1"];
  }, [selectedGrid]);

  useEffect(() => {
    if (grids && !selectedGrid) {
      setSelectedGrid(grids[0]);
    }
  }, [grids]);

  const value = useMemo<TakeAppointmentModalProviderContextProps>(
    () => ({
      selectedUser,
      isModalOpen,
      grids,
      gridInfo,
      gridSlots,
      selectedGrid,
      selectedSlotId,
      handleGridChange,
      handleOnClickSlot,
      setIsModalOpen,
      handleOnClickCard,
    }),
    [
      isModalOpen,
      selectedUser,
      grids,
      selectedGrid,
      gridInfo,
      gridSlots,
      selectedSlotId,
    ],
  );
  return (
    <TakeAppointmentModalProviderContext.Provider value={value}>
      {children}
    </TakeAppointmentModalProviderContext.Provider>
  );
};
