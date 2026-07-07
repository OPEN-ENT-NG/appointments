import { Event, Filter, FilterItem, FilterPref } from "./types";
import { MyMinimalAppointment } from "~/services/api/AppointmentService/types";
import { APPOINTMENT_FILTER_STATE, APPOINTMENT_STATE, FilterType } from "~/core/enums";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
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

export const FILTER_STATUS_I18N = {
  [APPOINTMENT_FILTER_STATE.ACCEPTED]: "appointments.accepted",
  [APPOINTMENT_FILTER_STATE.REFUSED]: "appointments.refused",
  [APPOINTMENT_FILTER_STATE.CANCELED]: "appointments.canceled",
  [APPOINTMENT_FILTER_STATE.CREATED_REQUESTER]: "appointments.pending.sent",
  [APPOINTMENT_FILTER_STATE.CREATED_RECIPIENT]: "appointments.pending.received",
};

export const createEventsFrom = (appointments: MyMinimalAppointment[]): Event[] => appointments.map(createEventFrom);

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
      filters: [],
    },
    {
      type: FilterType.GRID,
      filters: [],
    },
  ];
};

export const getBaseCalendarStatusFilterItems = (): FilterItem[] => {
  return [
    {
      id: APPOINTMENT_FILTER_STATE.ACCEPTED,
      name: FILTER_STATUS_I18N[APPOINTMENT_FILTER_STATE.ACCEPTED],
      IconComponent: <CheckCircleRoundedIcon sx={{ color: "success.main" }} />,
    },
    {
      id: APPOINTMENT_FILTER_STATE.REFUSED,
      name: FILTER_STATUS_I18N[APPOINTMENT_FILTER_STATE.REFUSED],
      IconComponent: <DoNotDisturbOnRoundedIcon sx={{ color: "error.main" }} />,
    },
    {
      id: APPOINTMENT_FILTER_STATE.CANCELED,
      name: FILTER_STATUS_I18N[APPOINTMENT_FILTER_STATE.CANCELED],
      IconComponent: <CancelRoundedIcon sx={{ color: "error.main" }} />,
    },
    {
      id: APPOINTMENT_FILTER_STATE.CREATED_REQUESTER,
      name: FILTER_STATUS_I18N[APPOINTMENT_FILTER_STATE.CREATED_REQUESTER],
      IconComponent: <HelpRoundedIcon sx={{ color: "warning.main" }} />,
    },
    {
      id: APPOINTMENT_FILTER_STATE.CREATED_RECIPIENT,
      name: FILTER_STATUS_I18N[APPOINTMENT_FILTER_STATE.CREATED_RECIPIENT],
      IconComponent: <ErrorRoundedIcon sx={{ color: "warning.main" }} />,
    },
  ];
};

export const getFilterStateFrom = (appointment: MyMinimalAppointment): APPOINTMENT_FILTER_STATE => {
  switch (appointment.state) {
    case APPOINTMENT_STATE.CREATED:
      return appointment.isRequester
        ? APPOINTMENT_FILTER_STATE.CREATED_REQUESTER
        : APPOINTMENT_FILTER_STATE.CREATED_RECIPIENT;
    case APPOINTMENT_STATE.ACCEPTED:
      return APPOINTMENT_FILTER_STATE.ACCEPTED;
    case APPOINTMENT_STATE.REFUSED:
      return APPOINTMENT_FILTER_STATE.REFUSED;
    case APPOINTMENT_STATE.CANCELED:
      return APPOINTMENT_FILTER_STATE.CANCELED;
  }
};