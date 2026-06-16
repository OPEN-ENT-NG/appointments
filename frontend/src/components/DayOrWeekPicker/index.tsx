import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { FC, useState } from "react";
import { WeekPickerProps } from "./types";
import { calendarStyle, CustomPickerDay, pickerDayStyle } from "./style";
import { isInSameWeek } from "~/core/utils";

dayjs.extend(isBetweenPlugin);
dayjs.extend(isoWeek);

export const DayOrWeekPicker: FC<WeekPickerProps> = ({
  weekpicker = false,
  currentDate,
  onSelectWeek,
}) => {
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [value] = useState<Dayjs | null>(dayjs(currentDate));

  const getDayComponent = (
    props: PickersDayProps<Dayjs> & {
      selectedDay?: Dayjs | null;
      hoveredDay?: Dayjs | null;
    },
  ) => {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return weekpicker ? (
      <CustomPickerDay
        {...other}
        day={day}
        selected={false}
        isSelected={isInSameWeek(day, selectedDay)}
        isHovered={isInSameWeek(day, hoveredDay)}
      />
    ) : (
      <PickersDay {...props} sx={pickerDayStyle} />
    );
  };

  return (
    <DateCalendar
      value={value}
      onChange={(newValue, _, selectedView) => {
        if (selectedView === "day") {
          onSelectWeek(newValue.toDate());
        }
      }}
      showDaysOutsideCurrentMonth
      slots={{ day: getDayComponent }}
      slotProps={{
        day: (ownerState) =>
          ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }) as any,
      }}
      sx={calendarStyle}
    />
  );
};
