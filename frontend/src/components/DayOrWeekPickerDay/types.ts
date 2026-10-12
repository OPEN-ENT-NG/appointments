import { PickerDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface DayOrWeekPickerDayProps extends PickerDayProps {
  weekpicker?: boolean;
  selectedDay?: Dayjs | null;
  hoveredDay?: Dayjs | null;
  onHoverDay?: (day: Dayjs | null) => void;
}

export interface CustomPickerDayProps extends PickerDayProps {
  isSelected: boolean;
  isHovered: boolean;
}
