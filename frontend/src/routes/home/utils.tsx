import { ViewMode } from "~/components/SwitchView/enums";
import { IToggleButtonItem } from "~/components/SwitchView/types";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

export const getToggleButtons: () => IToggleButtonItem[] = () => {
  return [
    { value: ViewMode.GRID, icon: <GridViewRoundedIcon /> },
    { value: ViewMode.CALENDAR, icon: <CalendarTodayRoundedIcon /> },
  ];
};
