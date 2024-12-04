import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import dayjs, { Dayjs } from "dayjs";

import { UserCardInfos } from "~/services/api/CommunicationService/types";
import {
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
} from "~/services/api/GridService";
import {
  DaySlots,
  GridNameWithId,
  TakeAppointmentModalProviderContextProps,
  TakeAppointmentModalProviderProps,
} from "./types";
import { transformTimeSlotsToDaySlots } from "./utils";

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
  const [currentDay, setCurrentDay] = useState<Dayjs>(dayjs().locale("fr"));
  const [currentSlots, setCurrentSlots] = useState<DaySlots[]>([]);
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
      beginDate: currentDay.startOf("week").format("YYYY-MM-DD"),
      endDate: currentDay.startOf("week").add(5, "day").format("YYYY-MM-DD"),
    },
    { skip: !selectedGrid },
  );

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

  useEffect(() => {
    if (!gridTimeSlots) return;
    console.log("gridTimeSlots", gridTimeSlots);
    setCurrentSlots(transformTimeSlotsToDaySlots(gridTimeSlots, currentDay));
  }, [gridTimeSlots]);

  useEffect(() => {
    console.log("currentSlots", currentSlots);
  }, [currentSlots]);

  // const gridSlots = gridTimeSlots
  //   ? transformTimeSlotsToDaySlots(gridTimeSlots)
  //   : [];

  // const gridSlots = useMemo(() => {
  //   return gridsTimeSlots["grid1"];
  // }, [selectedGrid]);

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
      currentSlots,
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
      currentSlots,
      currentDay,
      selectedSlotId,
    ],
  );
  return (
    <TakeAppointmentModalProviderContext.Provider value={value}>
      {children}
    </TakeAppointmentModalProviderContext.Provider>
  );
};
