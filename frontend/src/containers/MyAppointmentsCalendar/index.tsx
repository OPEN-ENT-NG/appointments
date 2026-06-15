import { FC, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
  Box,
  Button,
  Chip,
  Divider,
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
  headerCellDateStyle,
  headerCellHyphenStyle,
  headerCellStyle,
  nowIndicatorStyle,
  StyledHeader,
} from "./style";
import {
  DayHeaderContentArg,
  NowIndicatorContentArg,
  SlotLabelContentArg,
} from "@fullcalendar/core/index.js";
import { getDayName, getDayNumberAndMonthName } from "./utils";
import { DayOrWeekPicker } from "~/components/DayOrWeekPicker";

export const MyAppointmentsCalendar: FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const isMobile = useMediaQuery(
    `(max-width: ${BOOK_APPOINTMENT_MODAL_BREAKPOINT}px)`,
  );
  const [title, setTitle] = useState("");
  const [weekPickerAnchor, setWeekPickerAnchor] =
    useState<HTMLButtonElement | null>(null);
  const isWeekPickerOpen = Boolean(weekPickerAnchor);

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
  }, []);

  // Sync du titre à chaque navigation
  const handleDatesSet = () =>
    setTitle(calendarRef.current?.getApi().view.title ?? "");

  // Header actions
  const goNext = () => calendarRef.current?.getApi().next();
  const goPrev = () => calendarRef.current?.getApi().prev();
  const goToday = () => calendarRef.current?.getApi().today();
  const goToDate = (date: Date) => calendarRef.current?.getApi().gotoDate(date);

  // Calendar components styling

  const getDayHeaderContent = (arg: DayHeaderContentArg) => {
    const isCurrentDay = arg.date.toDateString() === new Date().toDateString();

    return (
      <Stack sx={headerCellStyle}>
        {isCurrentDay && <Divider sx={headerCellHyphenStyle} />}
        <Stack sx={headerCellDateStyle}>
          <Typography
            variant="caption"
            color={isCurrentDay ? "primary.main" : "text.secondary"}
            sx={{ fontWeight: isCurrentDay ? "bold" : "normal" }}
          >
            {getDayName(arg.date, frLocale.code)}
          </Typography>
          <Typography
            color={isCurrentDay ? "primary.main" : "text.secondary"}
            sx={{ fontWeight: isCurrentDay ? "bold" : "normal" }}
          >
            {getDayNumberAndMonthName(arg.date, frLocale.code)}
          </Typography>
        </Stack>
      </Stack>
    );
  };

  const getSlotLabelContent = (arg: SlotLabelContentArg) => {
    return (
      <Typography variant="caption" color="text.secondary" paddingX={2}>
        {arg.date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
    );
  };

  const getNowIndicatorContent = (arg: NowIndicatorContentArg) => {
    // Display the chip with current time in first column
    if (arg.isAxis) {
      return (
        <Chip
          color="primary"
          size="small"
          label={arg.date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          sx={{ fontSize: "1rem" }}
        />
      );
    }

    // Display fine line over all the grid
    const colEl = document.querySelector(".fc-col-header-cell") as HTMLElement;
    const colWidth = colEl?.clientWidth ?? 0;
    return (
      <Box
        sx={{
          ...nowIndicatorStyle,
          left: isMobile ? 0 : `-${(arg.date.getDay() - 1) * colWidth}px`,
        }}
      />
    );
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
        datesSet={handleDatesSet}
        height="80vh"
        dayHeaderContent={getDayHeaderContent}
        slotLabelContent={getSlotLabelContent}
        nowIndicatorContent={getNowIndicatorContent}
      />
    </Stack>
  );
};
