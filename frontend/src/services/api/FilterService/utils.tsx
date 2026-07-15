import { FilterItem } from "~/containers/MyAppointmentsCalendar/types";
import { APPOINTMENT_FILTER_STATE } from "~/core/enums";
import { getBaseCalendarStatusFilterItems } from "~/containers/MyAppointmentsCalendar/utils";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { GridFilterResponse } from "./types";

export const transformStatusResponseToFilterItems = (
  status: APPOINTMENT_FILTER_STATE[],
): FilterItem[] => {
  return getBaseCalendarStatusFilterItems().filter((f) =>
    status.includes(f.id as APPOINTMENT_FILTER_STATE),
  );
};

export const transformGridsResponseToFilterItems = (
  grids: GridFilterResponse[],
): FilterItem[] => {
  return grids.map((grid) => ({
    id: grid.id,
    name: grid.name,
    IconComponent: <CircleRoundedIcon sx={{ color: grid.color }} />,
  }));
};
