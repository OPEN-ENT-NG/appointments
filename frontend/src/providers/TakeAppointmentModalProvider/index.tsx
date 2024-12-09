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
import { loadingDaySlots, transformTimeSlotsToDaySlots } from "./utils";

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
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState<Dayjs>(dayjs().locale("fr"));
  const [currentSlots, setCurrentSlots] = useState<DaySlots[]>(
    loadingDaySlots(currentDay),
  );
  const [canGoNext, setCanGoNext] = useState(true);
  const [canGoPrev, setCanGoPrev] = useState(false);
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

  const handleOnClickSlot = (slotId: number) => {
    setSelectedSlotId(slotId);
  };

  const handleNextWeek = () => {
    const newCurrentDay = currentDay.add(1, "week");
    setCurrentDay((prev) => prev.add(1, "week"));
    setCurrentSlots(loadingDaySlots(newCurrentDay));
  };

  const handlePreviousWeek = () => {
    const newCurrentDay = currentDay.subtract(1, "week");
    setCurrentDay((prev) => prev.subtract(1, "week"));
    setCurrentSlots(loadingDaySlots(newCurrentDay));
  };

  const handleGridChange = (gridName: string) => {
    if (!grids) return;
    const newGrid = grids.find((grid) => grid.name === gridName);
    if (!newGrid) return;
    setSelectedGrid(newGrid);
    setSelectedSlotId(null);
    const newCurrentDay = dayjs().locale("fr");
    setCurrentDay(newCurrentDay);
    setCurrentSlots(loadingDaySlots(newCurrentDay));
  };

  useEffect(() => {
    if (gridTimeSlots)
      setCurrentSlots(transformTimeSlotsToDaySlots(gridTimeSlots, currentDay));
  }, [gridTimeSlots]);

  useEffect(() => {
    if (grids && !selectedGrid) {
      setSelectedGrid(grids[0]);
    }
  }, [grids]);

  useEffect(() => {
    if (currentDay.isSame(dayjs().locale("fr"), "week")) {
      setCanGoPrev(false);
    } else {
      setCanGoPrev(true);
    }
  }, [currentDay]);

  const value = useMemo<TakeAppointmentModalProviderContextProps>(
    () => ({
      selectedUser,
      isModalOpen,
      grids,
      gridInfos,
      currentSlots,
      selectedGrid,
      selectedSlotId,
      canGoNext,
      canGoPrev,
      handleGridChange,
      handleOnClickSlot,
      handleNextWeek,
      handlePreviousWeek,
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
      canGoNext,
      canGoPrev,
    ],
  );
  return (
    <TakeAppointmentModalProviderContext.Provider value={value}>
      {children}
    </TakeAppointmentModalProviderContext.Provider>
  );
};
