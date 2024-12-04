import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { UserCardInfos } from "~/services/api/CommunicationService/types";
import {
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
} from "~/services/api/GridService";
import {
  GridNameWithId,
  TakeAppointmentModalProviderContextProps,
  TakeAppointmentModalProviderProps,
} from "./types";
import { gridsTimeSlots } from "./utils";

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
  const [selectedGrid, setSelectedGrid] = useState<GridNameWithId | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: grids } = useGetAvailableUserMinimalGridsQuery(
    selectedUser?.userId ?? "",
    { skip: !selectedUser?.userId },
  );
  const { data: gridInfos } = useGetMinimalGridInfosByIdQuery(
    selectedGrid?.id ?? 0,
    { skip: !selectedGrid },
  );
  const { data: gridTimeSlots } = useGetTimeSlotsByGridIdAndDateQuery(
    {
      gridId: selectedGrid?.id ?? 0,
      beginDate: "2024-12-09",
      endDate: "2024-12-14",
    },
    { skip: !selectedGrid },
  );

  console.log(gridTimeSlots);

  const handleOnClickCard = (user: UserCardInfos | null) => {
    setSelectedUser(user);
    if (user) setIsModalOpen(true);
  };

  const handleOnClickSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  const handleGridChange = (gridName: string) => {
    if (!grids) return;
    setSelectedGrid(grids?.find((grid) => grid.name === gridName));
    setSelectedSlotId(null);
  };

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
      gridInfos,
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
      gridInfos,
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
