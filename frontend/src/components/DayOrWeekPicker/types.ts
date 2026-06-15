import { PickerDayProps } from "@mui/x-date-pickers";

export interface WeekPickerProps {
  weekpicker?: boolean;
  currentDate: Date;
  onSelectWeek: (date: Date) => void;
}

export interface CustomPickerDayProps extends PickerDayProps {
  isSelected: boolean;
  isHovered: boolean;
}
