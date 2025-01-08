import { FC } from "react";

import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import {
  appointmentsLegendStyle,
  calandarStyle,
  containerStyle,
  legendRowStyle,
  legendStyle,
  StyledDay,
  todayLegendStyle,
} from "./style";
import { CustomDateCalendarProps } from "./types";
import { isWithAcceptedAppointment } from "./utils";
import { isToday } from "~/core/utils";

export const CustomDateCalendar: FC<CustomDateCalendarProps> = ({
  acceptedAppointmentsDates,
}) => {
  return (
    <Box sx={containerStyle}>
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
        sx={calandarStyle}
      />
      <Box sx={legendStyle}>
        <Box sx={legendRowStyle}>
          <Box sx={todayLegendStyle}></Box>
          <Box>Aujourd'hui</Box>
        </Box>
        <Box sx={legendRowStyle}>
          <Box sx={appointmentsLegendStyle}></Box>
          <Box>Rendez-vous</Box>
        </Box>
      </Box>
    </Box>
  );
};
