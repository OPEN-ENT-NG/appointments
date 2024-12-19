import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useBookAppointmentMutation } from "~/services/api/AppointmentService";
import { UserCardInfos } from "~/services/api/CommunicationService/types";
import {
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
} from "~/services/api/GridService";
import { useFindAppointments } from "../FindAppointmentsProvider";
import {
  BookAppointmentModalProviderContextProps,
  BookAppointmentModalProviderProps,
  DaySlots,
  GridNameWithId,
} from "./types";
import {
  loadingDaySlots,
  transformStringToDayjs,
  transformTimeSlotsToDaySlots,
} from "./utils";

const BookAppointmentModalProviderContext =
  createContext<BookAppointmentModalProviderContextProps | null>(null);

export const useBookAppointmentModal = () => {
  const context = useContext(BookAppointmentModalProviderContext);
  if (!context) {
    throw new Error(
      "useBookAppointmentModal must be used within a BookAppointmentModalProvider",
    );
  }
  return context;
};

export const BookAppointmentModalProvider: FC<
  BookAppointmentModalProviderProps
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
  const [isVideoCallOptionChecked, setIsVideoCallOptionChecked] =
    useState(false);

  const { t } = useTranslation("appointments");

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

  const [bookAppointment] = useBookAppointmentMutation();
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

  const handleVideoCallCheckboxChange = () => {
    setIsVideoCallOptionChecked((prev) => !prev);
  };

  const handleSubmitAppointment = async () => {
    if (!selectedSlotId) {
      console.log("no slot selected");
      return;
    }
    try {
      console.log("try");
      const bookAppointmentPayload = gridInfos?.videoCallLink.length
        ? { timeSlotId: selectedSlotId, isVideoCall: isVideoCallOptionChecked }
        : { timeSlotId: selectedSlotId };

      await bookAppointment(bookAppointmentPayload).unwrap();
      toast.success(t("appointments.book.appointment.success"));
    } catch (error: any) {
      if (error && error.status) {
        if (error.status === 409) {
          toast.error(t("appointments.book.appointment.error.not.available"));
        }
        if (error.status === 500) {
          toast.error(t("appointments.book.appointment.internal.error"));
        }
      }
    }
    handleCloseModal();
    refreshSearch();
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setSelectedGrid(null);
    setSelectedSlotId(null);
    setCurrentDay(dayjs().locale("fr"));
    setIsVideoCallOptionChecked(false);
    setIsModalOpen(false);
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
  }, [grids, selectedGrid]);

  useEffect(() => {
    if (currentDay.isSame(dayjs().locale("fr"), "week")) {
      setCanGoPrev(false);
    } else {
      setCanGoPrev(true);
    }
  }, [currentDay]);

  const value = useMemo<BookAppointmentModalProviderContextProps>(
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
      isVideoCallOptionChecked,
      handleGridChange,
      handleOnClickSlot,
      handleNextWeek,
      handlePreviousWeek,
      handleNextTimeSlot,
      handleCloseModal,
      handleOnClickCard,
      handleSubmitAppointment,
      handleVideoCallCheckboxChange,
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
      isVideoCallOptionChecked,
    ],
  );
  return (
    <BookAppointmentModalProviderContext.Provider value={value}>
      {children}
    </BookAppointmentModalProviderContext.Provider>
  );
};
