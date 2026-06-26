import { EventContentArg } from "@fullcalendar/core/index.js";
import { EventColors } from "~/containers/MyAppointmentsCalendar/types";

export interface CalendarEventProps {
  eventInfo: EventContentArg;
}

export interface StyledCalendarEventProps {
  colors: EventColors;
}
