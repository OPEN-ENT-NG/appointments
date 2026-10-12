import { ViewMode } from "~/components/SwitchView/enums";
import { IToggleButtonItem } from "~/components/SwitchView/types";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { t } from "~/i18n";

export const getToggleButtons: () => IToggleButtonItem[] = () => {
  return [
    {
      value: ViewMode.GRID,
      icon: <GridViewRoundedIcon />,
      ariaLabel: t("appointments.view.list"),
    },
    {
      value: ViewMode.CALENDAR,
      icon: <CalendarTodayRoundedIcon />,
      ariaLabel: t("appointments.view.calendar"),
    },
  ];
};
