import { PickerDay } from "@mui/x-date-pickers/PickerDay";
import { FC } from "react";
import { DayOrWeekPickerDayProps } from "./types";
import { CustomPickerDay, pickerDayStyle } from "./style";
import { isInSameWeek } from "~/core/utils";

export const DayOrWeekPickerDay: FC<DayOrWeekPickerDayProps> = ({
  weekpicker,
  selectedDay,
  hoveredDay,
  onHoverDay,
  ...props
}) => {
  if (!weekpicker) return <PickerDay {...props} sx={pickerDayStyle} />;

  const { day, onFocus, onBlur, ...other } = props;

  return (
    <CustomPickerDay
      {...other}
      day={day}
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
      onPointerEnter={() => onHoverDay?.(day)}
      onPointerLeave={() => onHoverDay?.(null)}
      onFocus={(event, focusedDay) => {
        onFocus?.(event, focusedDay);
        onHoverDay?.(day);
      }}
      onBlur={(event, blurredDay) => {
        onBlur?.(event, blurredDay);
        onHoverDay?.(null);
      }}
    />
  );
};
