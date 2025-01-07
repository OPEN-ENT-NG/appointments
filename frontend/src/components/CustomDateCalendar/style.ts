import { Box, styled } from "@mui/material";

import { StyledDayProps } from "./types";

export const StyledDay = styled(Box)<StyledDayProps>(
  ({ theme, isWithAcceptedAppointment, isToday }) => ({
    backgroundColor: isWithAcceptedAppointment
      ? theme.palette.success.light
      : "transparent",
    border: isToday ? `1px solid ${theme.palette.common.black}` : "none",
    borderRadius: "50%",
    width: "3.6rem",
    height: "3.6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    ...(isWithAcceptedAppointment && {
      "::after": {
        content: '""',
        position: "absolute",
        bottom: "-2px",
        width: ".8rem",
        height: ".8rem",
        backgroundColor: theme.palette.success.main,
        borderRadius: "50%",
      },
    }),
  }),
);
