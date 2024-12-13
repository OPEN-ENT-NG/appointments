import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import dayjs, { Dayjs } from "dayjs";

import {
  Alert,
  DaySlots,
  GridNameWithId,
  TakeAppointmentModalProviderContextProps,
  TakeAppointmentModalProviderProps,
} from "./types";
import {
  loadingDaySlots,
  transformStringToDayjs,
  transformTimeSlotsToDaySlots,
} from "./utils";
import { useFindAppointments } from "../FindAppointmentsProvider";
import { useTakeAppointmentMutation } from "~/services/api/AppointmentService";
import { UserCardInfos } from "~/services/api/CommunicationService/types";
import {
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
} from "~/services/api/GridService";

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
    loadingDaySlots(dayjs().locale("fr")),
  );
  const [nextAvailableTimeSlot, setNextAvailableTimeSlot] =
    useState<Dayjs | null>(null);
  const [hasNoSlots, setHasNoSlots] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisioOptionChecked, setIsVisioOptionChecked] = useState(false);

  const [alert, setAlert] = useState<Alert>({
    isOpen: false,
    alertType: "success",
    message: "",
  });

  const { data: grids } = useGetAvailableUserMinimalGridsQuery(
    selectedUser?.userId ?? "",
    { skip: !selectedUser?.userId },
  );
  const { data: gridInfos } = useGetMinimalGridInfosByIdQuery(
    selectedGrid?.id ?? 0,
    { skip: !selectedGrid },
  );
  const { data: gridTimeSlots, isFetching: isGridTimeSlotsFetching } =
    useGetTimeSlotsByGridIdAndDateQuery(
      {
        gridId: selectedGrid?.id ?? 0,
        beginDate: currentDay.startOf("week").format("YYYY-MM-DD"),
        endDate: currentDay.startOf("week").add(5, "day").format("YYYY-MM-DD"),
      },
      { skip: !selectedGrid },
    );

  const [takeAppointment] = useTakeAppointmentMutation();
  const { refreshSearch } = useFindAppointments();

  const handleOnClickCard = (user: UserCardInfos | null) => {
    setSelectedUser(user);
    if (user) setIsModalOpen(true);
  };

  const handleOnClickSlot = (slotId: number) => {
    setSelectedSlotId(slotId);
  };

  const handleNextWeek = () => {
    setCurrentDay((prev) => prev.add(1, "week"));
  };

  const handlePreviousWeek = () => {
    setCurrentDay((prev) => prev.subtract(1, "week"));
  };

  const handleNextTimeSlot = () => {
    if (nextAvailableTimeSlot) {
      setCurrentDay(nextAvailableTimeSlot);
    }
  };

  const handleGridChange = (gridName: string) => {
    if (!grids) return;
    const newGrid = grids.find((grid) => grid.name === gridName);
    if (!newGrid) return;
    setCanGoNext(true);
    setCanGoPrev(false);
    setSelectedGrid(newGrid);
    setSelectedSlotId(null);
    setCurrentDay(dayjs().locale("fr"));
  };

  const handleVisioCheckboxChange = () => {
    setIsVisioOptionChecked((prev) => !prev);
  };

  const handleSubmitAppointment = async () => {
    if (!selectedSlotId) return;
    try {
      const takeAppointmentPayload = gridInfos?.visioLink.length
        ? { timeSlotId: selectedSlotId, isVisio: isVisioOptionChecked }
        : { timeSlotId: selectedSlotId };

      await takeAppointment(takeAppointmentPayload).unwrap();
      setAlert({
        isOpen: true,
        alertType: "success",
        message: "Rendez-vous pris avec succès",
      });
    } catch (error: any) {
      if (error && error.status) {
        if (error.status === 409) {
          setAlert({
            isOpen: true,
            alertType: "error",
            message: "Rendez-vous déjà pris",
          });
        }
        if (error.status === 500) {
          setAlert({
            isOpen: true,
            alertType: "error",
            message: "Erreur serveur",
          });
        }
      }
    }
    setIsModalOpen(false);
    refreshSearch();
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  useEffect(() => {
    if (gridTimeSlots) {
      setCurrentSlots(transformTimeSlotsToDaySlots(gridTimeSlots, currentDay));
      setNextAvailableTimeSlot(
        gridTimeSlots.nextAvailableTimeSlot
          ? transformStringToDayjs(
              gridTimeSlots.nextAvailableTimeSlot.beginDate,
            )
          : null,
      );

      setHasNoSlots(!gridTimeSlots.timeslots);
      setCanGoNext(
        !!gridTimeSlots.nextAvailableTimeSlot || !!gridTimeSlots.timeslots,
      );
    }
  }, [gridTimeSlots]);

  useEffect(() => {
    if (isGridTimeSlotsFetching) {
      setCurrentSlots(loadingDaySlots(currentDay));
    }
  }, [isGridTimeSlotsFetching]);

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
      hasNoSlots,
      nextAvailableTimeSlot,
      isGridTimeSlotsFetching,
      isVisioOptionChecked,
      alert,
      handleGridChange,
      handleOnClickSlot,
      handleNextWeek,
      handlePreviousWeek,
      handleNextTimeSlot,
      setIsModalOpen,
      handleOnClickCard,
      handleSubmitAppointment,
      handleVisioCheckboxChange,
      handleCloseAlert,
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
      hasNoSlots,
      nextAvailableTimeSlot,
      isGridTimeSlotsFetching,
      isVisioOptionChecked,
      alert,
    ],
  );
  return (
    <TakeAppointmentModalProviderContext.Provider value={value}>
      {children}
    </TakeAppointmentModalProviderContext.Provider>
  );
};
