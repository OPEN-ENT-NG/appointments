import { FC, useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@cgi-learning-hub/ui";
import {
  SLOT_DURATION,
  SLOT_LABEL_INTERVAL,
  SLOT_MAX_TIME,
  SLOT_MIN_TIME,
} from "~/core/constants";
import { BOOK_APPOINTMENT_MODAL_BREAKPOINT } from "~/core/breakpoints";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { t } from "~/i18n";
import {
  calendarContainerStyle,
  modalPopoverStyle,
  StyledHeader,
} from "./style";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core/index.js";
import { createEventsFrom, generateSampleEvents } from "./utils";
import { DayOrWeekPicker } from "~/components/DayOrWeekPicker";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { CalendarEvent } from "~/components/calendar/CalendarEvent";
import { CalendarNowIndicator } from "~/components/calendar/CalendarNowIndicator";
import { CalendarSlotLabel } from "~/components/calendar/CalendarSlotLabel";
import { CalendarDayHeader } from "~/components/calendar/CalendarDayHeader";
import { AppointmentInfosModal } from "../AppointmentInfosModal";

export const MyAppointmentsCalendar: FC = () => {
  const {
    myCalendarAppointments,
    updateDisplayedWeek,
    updateDisplayedDay,
    selectedAppointment,
    handleClickAppointment,
    handleCloseAppointmentModal,
  } = useMyAppointments();
  const isMobile = useMediaQuery(
    `(max-width: ${BOOK_APPOINTMENT_MODAL_BREAKPOINT}px)`,
  );
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState("");
  const [currentDateRangeStart, setCurrentDateRangeStart] = useState<Date>(
    new Date(),
  );
  const [weekPickerAnchor, setWeekPickerAnchor] =
    useState<HTMLButtonElement | null>(null);
  const isWeekPickerOpen = Boolean(weekPickerAnchor);
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const isModalOpen = Boolean(modalAnchor);
  const scrollEventPositionRef = useRef<number>(0);

  const formattedAppointments = useMemo(() => {
    // return createEventsFrom(myCalendarAppointments);
    return createEventsFrom(generateSampleEvents());
  }, [myCalendarAppointments]);

  useEffect(() => {
    // Init du titre au montage
    setTitle(calendarRef.current?.getApi().view.title ?? "");

    // Scroll automatiquement à l'heure actuelle à l'init
    const timeout = setTimeout(() => {
      calendarRef.current?.getApi().scrollToTime({
        hour: new Date().getHours() - 1, // -1 to show a bit of context above current time
        minute: new Date().getMinutes(),
      });
    }, 300); // delay to let FullCalendar render the view

    return () => clearTimeout(timeout);
  }, [formattedAppointments]);

  // Refresh myAppointements according to currently displayed date(s)
  useEffect(() => {
    return isMobile
      ? updateDisplayedDay(currentDateRangeStart)
      : updateDisplayedWeek(currentDateRangeStart);
  }, [
    isMobile,
    currentDateRangeStart,
    updateDisplayedWeek,
    updateDisplayedDay,
  ]);

  // Sync du titre et current date à chaque navigation
  const handleDatesSet = (dateInfos: DatesSetArg) => {
    if (currentDateRangeStart.getTime() === dateInfos.start.getTime()) return; // pas de changement
    setCurrentDateRangeStart(dateInfos.start);
    setTitle(calendarRef.current?.getApi().view.title ?? "");
  };

  // Header actions
  const goNext = () => calendarRef.current?.getApi().next();
  const goPrev = () => calendarRef.current?.getApi().prev();
  const goToday = () => calendarRef.current?.getApi().today();
  const goToDate = (date: Date) => calendarRef.current?.getApi().gotoDate(date);

  // Event actions
  const handleEventClick = (eventInfo: EventClickArg) => {
    scrollEventPositionRef.current = window.scrollY;
    setModalAnchor(eventInfo.el);
    handleClickAppointment(Number.parseInt(eventInfo.event.id));
  };

  const handleCloseModal = () => {
    setModalAnchor(null);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollEventPositionRef.current);
    });
    handleCloseAppointmentModal();
  };

  // WeekPicker

  const openWeekPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWeekPickerAnchor(event.currentTarget);
  };

  const closeWeekPicker = () => {
    setWeekPickerAnchor(null);
  };

  const handleSelectWeek = (date: Date) => {
    goToDate(date);
    closeWeekPicker();
  };

  return (
    <Stack sx={calendarContainerStyle}>
      {/* Event selected modal */}
      {selectedAppointment && (
        <Popover
          open={isModalOpen}
          anchorEl={modalAnchor}
          onClose={handleCloseAppointmentModal}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={modalPopoverStyle}
        >
          <AppointmentInfosModal
            appointment={selectedAppointment}
            floatingMode={!isMobile}
          />
        </Popover>
      )}

      {/* Weekpicker popover */}
      <Popover
        open={isWeekPickerOpen}
        anchorEl={weekPickerAnchor}
        onClose={closeWeekPicker}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DayOrWeekPicker
          weekpicker={!isMobile}
          currentDate={calendarRef.current?.getApi().getDate() ?? new Date()}
          onSelectWeek={handleSelectWeek}
        />
      </Popover>

      {/* HeaderToolbar */}
      <StyledHeader isMobile={isMobile}>
        <IconButton onClick={openWeekPicker} color="primary">
          <EventRoundedIcon />
        </IconButton>
        <IconButton onClick={goPrev} color="primary">
          <ChevronLeftRoundedIcon />
        </IconButton>
        <Typography>{title}</Typography>
        <IconButton onClick={goNext} color="primary">
          <ChevronRightRoundedIcon />
        </IconButton>
        <Button
          onClick={goToday}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ minHeight: "3rem", fontSize: "1.3rem" }}
        >
          {t("appointments.today")}
        </Button>
      </StyledHeader>

      {/* Calendar view*/}
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
        locale={frLocale}
        headerToolbar={false} // We use our own above
        slotMinTime={SLOT_MIN_TIME}
        slotMaxTime={SLOT_MAX_TIME}
        slotDuration={SLOT_DURATION}
        slotLabelInterval={SLOT_LABEL_INTERVAL}
        weekends={true}
        hiddenDays={[0]} // Hide Sundays
        allDaySlot={false}
        nowIndicator
        scrollTimeReset={false} // Avoid going to top when selecting event
        eventInteractive
        datesSet={handleDatesSet}
        events={formattedAppointments}
        dayHeaderContent={(arg) => (
          <CalendarDayHeader arg={arg} locale={frLocale} />
        )}
        slotLabelContent={(slot) => <CalendarSlotLabel slot={slot} />}
        nowIndicatorContent={(nowIndicator) => (
          <CalendarNowIndicator
            nowIndicator={nowIndicator}
            isMobile={isMobile}
          />
        )}
        eventContent={(eventInfo) => (
          <CalendarEvent
            eventInfo={eventInfo}
            onCloseModal={handleCloseModal}
          />
        )}
        eventClick={handleEventClick}
        height="80vh"
      />
    </Stack>
  );
};
