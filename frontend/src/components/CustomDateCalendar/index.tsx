import { FC, useEffect, useState } from "react";

import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { MONTH } from "~/core/dayjs.const";
import { isToday } from "~/core/utils";
import {
  calandarStyle,
  StyledDay,
} from "./style";
import { CustomDateCalendarProps } from "./types";
import { isWithAcceptedAppointment } from "./utils";

dayjs.extend(isoWeek);

export const CustomDateCalendar: FC<CustomDateCalendarProps> = ({
  acceptedAppointmentsDates,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [nbWeeksOfCurrentMonth, setNbWeeksOfCurrentMonth] = useState(0);

  useEffect(() => {
    const firstDayOfCurrentMonth = currentMonth.startOf(MONTH);
    const lastDayOfCurrentMonth = currentMonth.endOf(MONTH);

    const firstWeek = firstDayOfCurrentMonth.isoWeek();
    const lastWeek = lastDayOfCurrentMonth.isoWeek();

    setNbWeeksOfCurrentMonth(lastWeek - firstWeek + 1);
  }, [currentMonth]);

  return (
    <DateCalendar
      slots={{
        day: ({ day }) => {
          return (
            <StyledDay
              isWithAcceptedAppointment={isWithAcceptedAppointment(
                day,
                acceptedAppointmentsDates,
              )}
              isToday={isToday(day)}
              isMonthDay={currentMonth.isSame(day, MONTH)}
              nbWeeksOfCurrentMonth={nbWeeksOfCurrentMonth}
            >
              {day.date()}
            </StyledDay>
          );
        },
      }}
      onMonthChange={(month) => setCurrentMonth(month)}
      onYearChange={(year) => setCurrentMonth(year)}
      sx={calandarStyle}
    />
  );
};
