import { AppointmentsType } from "~/providers/MyAppointmentsProvider/types";
import { Event, Filter, FilterItem, FilterPref } from "./types";
import { MyMinimalAppointment } from "~/services/api/AppointmentService/types";
import { APPOINTMENT_STATE, FilterType } from "~/core/enums";
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

//TODO: use enum from Niko instead
export const FILTER_STATUS_I18N = {
  ACCEPTED: "appointments.accepted",
  REFUSED: "appointments.refused",
  CANCELED: "appointments.canceled",
  CREATED_REQUESTER: "appointments.pending.sent",
  CREATED_RECIPIENT: "appointments.pending.received",
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

const buildFilterItems = (
  filtersPref: FilterPref[],
  type: FilterType,
  filtersList: FilterItem[],
): FilterItem[] => {
  const filterPrefItemIds =
    filtersPref.find((f) => f.type === type)?.filters ?? [];
  return filtersList.map((item) => ({
    ...item,
    checked: filterPrefItemIds.includes(item.id),
  }));
};

export const buildCalendarFiltersFromPref = (
  filtersPref: FilterPref[],
  statusFiltersList: FilterItem[],
  gridFiltersList: FilterItem[],
): Filter[] => [
  {
    type: FilterType.STATUS,
    filters: buildFilterItems(
      filtersPref,
      FilterType.STATUS,
      statusFiltersList,
    ),
  },
  {
    type: FilterType.GRID,
    filters: buildFilterItems(filtersPref, FilterType.GRID, gridFiltersList),
  },
];

export const buildCalendarFiltersPref = (filters: Filter[]): FilterPref[] => {
  const statusFiltersIds =
    filters
      .find((f) => f.type === FilterType.STATUS)
      ?.filters.filter((f) => f.checked)
      .map((f) => f.id) ?? [];
  const gridsFiltersIds =
    filters
      .find((f) => f.type === FilterType.GRID)
      ?.filters.filter((f) => f.checked)
      .map((f) => f.id) ?? [];

  return [
    { type: FilterType.STATUS, filters: statusFiltersIds },
    { type: FilterType.GRID, filters: gridsFiltersIds },
  ];
};

export const getDefaultCalendarFiltersPref = (): FilterPref[] => {
  return [
    {
      type: FilterType.STATUS,
      filters: [1, 2, 5],
    },
    {
      type: FilterType.GRID,
      filters: [42, 44], //TODO: delete these ids
    },
  ];
};
