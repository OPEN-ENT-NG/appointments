import { AppointmentsType } from "~/providers/MyAppointmentsProvider/types";
import { Event } from "./types";
import { MyMinimalAppointment } from "~/services/api/AppointmentService/types";
import { APPOINTMENT_STATE } from "~/core/enums";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { hexWithOpacity } from "~/core/utils";

const EVENT_ICON_CONFIG = {
  [APPOINTMENT_STATE.CREATED]: { color: "warning.main", icon: HelpRoundedIcon },
  [APPOINTMENT_STATE.ACCEPTED]: {
    color: "success.main",
    icon: CheckCircleRoundedIcon,
  },
  [APPOINTMENT_STATE.CANCELED]: {
    color: "error.main",
    icon: CancelRoundedIcon,
  },
  [APPOINTMENT_STATE.REFUSED]: {
    color: "error.main",
    icon: DoNotDisturbOnRoundedIcon,
  },
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
    colors: {
      background: hexWithOpacity(appointment.gridColor, 12.5),
      border: appointment.gridColor,
      icon: EVENT_ICON_CONFIG[appointment.state].color,
    },
    IconComponent: getIconComponent(appointment.state, appointment.isRequester),
  },
});

const getIconComponent = (state: APPOINTMENT_STATE, isRequester: boolean) => {
  if (state === APPOINTMENT_STATE.CREATED) {
    return isRequester ? WarningRoundedIcon : HelpRoundedIcon;
  }
  return EVENT_ICON_CONFIG[state].icon;
};
