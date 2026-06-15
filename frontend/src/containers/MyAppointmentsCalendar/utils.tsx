import { AppointmentsType } from "~/providers/MyAppointmentsProvider/types";
import { Event } from "./types";
import { MyMinimalAppointment } from "~/services/api/AppointmentService/types";
import { APPOINTMENT_STATE } from "~/core/enums";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const EVENT_COLORS = {
  [APPOINTMENT_STATE.CREATED]: {
    background: "#fff8e1",
    border: "#ffca28",
    icon: "#ffca28",
  },
  [APPOINTMENT_STATE.ACCEPTED]: {
    background: "#e8f5e9",
    border: "#66bb6a",
    icon: "#ffca28",
  },
  [APPOINTMENT_STATE.CANCELED]: {
    background: "#fce4ec",
    border: "#ef9a9a",
    icon: "#ffca28",
  },
  [APPOINTMENT_STATE.REFUSED]: {
    background: "#e3f2fd",
    border: "#64b5f6",
    icon: "#ffca28",
  },
};

const EVENT_ICON_COMPONENTS = {
  [APPOINTMENT_STATE.CREATED]: HelpRoundedIcon,
  [APPOINTMENT_STATE.ACCEPTED]: CheckCircleRoundedIcon,
  [APPOINTMENT_STATE.CANCELED]: CancelRoundedIcon,
  [APPOINTMENT_STATE.REFUSED]: DoNotDisturbOnRoundedIcon,
};

export const createEventsFrom = (appointments: AppointmentsType): Event[] => {
  return Object.entries(appointments).flatMap(
    ([, myAppointments]) =>
      myAppointments?.appointments.map((appointment: MyMinimalAppointment) =>
        createEventFrom(appointment),
      ) ?? [],
  );
};

const createEventFrom = (appointment: MyMinimalAppointment): Event => ({
  id: appointment.id.toString(),
  title: appointment.displayName,
  start: appointment.beginDate.toISOString(),
  end: appointment.endDate.toISOString(),
  extendedProps: {
    comment: appointment.comment,
    colors: EVENT_COLORS[appointment.state],
    IconComponent: getIconComponent(appointment.state, appointment.isRequester),
  },
});

const getIconComponent = (state: APPOINTMENT_STATE, isRequester: boolean) => {
  if (state === APPOINTMENT_STATE.CREATED) {
    return isRequester ? WarningRoundedIcon : HelpRoundedIcon;
  }
  return EVENT_ICON_COMPONENTS[state];
};
