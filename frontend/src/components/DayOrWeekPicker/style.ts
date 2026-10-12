import { Theme } from "@cgi-learning-hub/ui";

export const calendarStyle = (theme: Theme) => ({
  borderRadius: "1rem",
  boxShadow: "0px 2px 8px 0px rgba(176, 176, 176, 0.25)",
  width: "26rem",
  height: "27.5rem",

  // Header
  "& .MuiPickersCalendarHeader-label": {
    fontSize: "1.4rem",
  },
  "& .MuiPickersDay-root": {
    fontSize: "1.4rem",
  },
  "& .MuiDayCalendar-header": {
    height: "2rem",
    marginBottom: "1rem",
  },

  // Week
  "& .MuiDayCalendar-weekDayLabel": {
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    width: "2.9rem",
  },

  // Month
  "& .MuiPickersMonth-monthButton": {
    fontSize: "1.4rem",
  },

  // Year
  "& .MuiPickersYear-root": {
    maxWidth: "8rem",
  },
  "& .MuiPickersYear-yearButton": {
    fontSize: "1.4rem",
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
});
