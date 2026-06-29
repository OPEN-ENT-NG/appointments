import { EventContentArg } from "@fullcalendar/core/index.js";
import { Appointment } from "~/services/api/AppointmentService/types";

export const getEventDuration = (eventInfo: EventContentArg) => {
  const start = eventInfo.event.start as Date;
  const end = eventInfo.event.end as Date;
  const duration = (end.getTime() - start.getTime()) / (1000 * 60);
  return duration;
};

export const isEventLessThan = (
  eventInfo: EventContentArg,
  minutes: number,
) => {
  return getEventDuration(eventInfo) < minutes;
};

export const isSelectedEvent = (
  selectedAppointment: Appointment | null,
  currentEvent: EventContentArg,
): boolean => {
  if (!selectedAppointment) return false;
  return selectedAppointment.id === Number.parseInt(currentEvent.event.id);
};
