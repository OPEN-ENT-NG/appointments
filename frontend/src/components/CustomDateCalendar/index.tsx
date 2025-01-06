import { FC } from "react";

import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { StyledDay } from "./style";

export const CustomDateCalendar: FC = () => {
  const mockedSelectedDates = [
    dayjs("2025-01-10"),
    dayjs("2025-01-15"),
    dayjs("2025-01-20"),
    dayjs("2025-01-25"),
    dayjs("2025-01-30"),
    dayjs("2025-02-05"),
    dayjs("2025-02-08"),
    dayjs("2025-02-12"),
  ];

  const isSelectedDate = (date: Dayjs) =>
    mockedSelectedDates.some((selectedDate) =>
      selectedDate.isSame(date, "day"),
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{
          day: (props) => {
            const { day } = props;
            const selected = isSelectedDate(day);

            return <StyledDay selected={selected}>{day.date()}</StyledDay>;
          },
        }}
      />
    </LocalizationProvider>
  );
};
