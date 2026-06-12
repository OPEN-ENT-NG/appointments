import { PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface WeekPickerProps {
  currentDate: Date;
  onSelectWeek: (date: Date) => void;
}

export interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isHovered: boolean;
}