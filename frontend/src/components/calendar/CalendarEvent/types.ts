import { EventContentArg } from "@fullcalendar/core/index.js";

export interface CalendarEventProps {
  eventInfo: EventContentArg;
  onCloseModal: () => void;
}
