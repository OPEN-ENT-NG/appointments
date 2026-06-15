import { styled } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import { CustomPickerDayProps } from "./types";
import { ComponentType } from "react";
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
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
});

export const pickerDayStyle =  {
  margin: 0,
  border: "none !important",
  width: "3.3rem",
  height: "3.3rem",
}

export const CustomPickerDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  ...pickerDayStyle,
  borderRadius: 0,

  // On interractions
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  ...(!isSelected && !isHovered && {
    "&:focus": {
      backgroundColor: "transparent",
    },
  }),



  // Create a rounding style for first and last day
  ...(day.day() === 1 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 0 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as ComponentType<CustomPickerDayProps>;