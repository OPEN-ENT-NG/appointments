import { Box, styled } from "@mui/material";

import { StyledDayProps } from "./types";

export const calandarStyle = {
  borderRadius: "1rem",
  boxShadow: "0px 2px 8px 0px rgba(176, 176, 176, 0.25)",
};

export const StyledDay = styled(Box)<StyledDayProps>(
  ({ theme, isWithAcceptedAppointment, isToday }) => ({
    backgroundColor: isWithAcceptedAppointment
      ? theme.palette.success.light
      : "transparent",
    border: isToday ? `1px solid ${theme.palette.common.black}` : "none",
    borderRadius: "50%",
    width: "3rem",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "0.2rem",

    ...(isWithAcceptedAppointment && {
      "::after": {
        content: '""',
        position: "absolute",
        bottom: "-.3rem",
        width: ".8rem",
        height: ".8rem",
        backgroundColor: theme.palette.success.main,
        borderRadius: "50%",
      },
    }),
  }),
);
