import { FC } from "react";

import { DateCalendar } from "@mui/x-date-pickers";

import { StyledDay } from "./style";
import { CustomDateCalendarProps } from "./types";
import { isWithAcceptedAppointment } from "./utils";
import { isToday } from "~/core/utils";

export const CustomDateCalendar: FC<CustomDateCalendarProps> = ({
  acceptedAppointmentsDates,
}) => {
  return (
    <DateCalendar
      slots={{
        day: (props) => {
          const { day } = props;
          return (
            <StyledDay
              isWithAcceptedAppointment={isWithAcceptedAppointment(
                day,
                acceptedAppointmentsDates,
              )}
              isToday={isToday(day)}
            >
              {day.date()}
            </StyledDay>
          );
        },
      }}
    />
  );
};
