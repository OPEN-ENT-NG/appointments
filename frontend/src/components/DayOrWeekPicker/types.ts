export interface WeekPickerProps {
  weekpicker?: boolean;
  currentDate: Date;
  onSelectWeek: (date: Date) => void;
}
