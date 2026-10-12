import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { FC, useState } from "react";
import { WeekPickerProps } from "./types";
import { calendarStyle } from "./style";
import { DayOrWeekPickerDay } from "~/components/DayOrWeekPickerDay";

dayjs.extend(isBetweenPlugin);
dayjs.extend(isoWeek);

export const DayOrWeekPicker: FC<WeekPickerProps> = ({
  weekpicker = false,
  currentDate,
  onSelectWeek,
}) => {
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [value] = useState<Dayjs | null>(dayjs(currentDate));

  return (
    <DateCalendar
      value={value}
      onChange={(newValue, _, selectedView) => {
        if (selectedView === "day" && newValue) {
          onSelectWeek(newValue.toDate());
        }
      }}
      showDaysOutsideCurrentMonth
      shouldDisableDate={(date) => date.day() === 0}
      slots={{ day: DayOrWeekPickerDay }}
      slotProps={{
        day: {
          weekpicker,
          selectedDay: value,
          hoveredDay,
          onHoverDay: setHoveredDay,
        } as any,
      }}
      sx={calendarStyle}
    />
  );
};
