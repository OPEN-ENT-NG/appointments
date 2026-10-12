import { styled } from "@mui/material";
import { PickerDay } from "@mui/x-date-pickers";
import { CustomPickerDayProps } from "./types";
import { ComponentType } from "react";

export const pickerDayStyle = {
  margin: 0,
  border: "none !important",
  width: "3.3rem",
  height: "3.3rem",
};

export const CustomPickerDay = styled(PickerDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  ...pickerDayStyle,
  borderRadius: 0,

  // On interractions
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  ...(!isSelected &&
    !isHovered && {
      "&:focus:not(.Mui-focusVisible)": {
        backgroundColor: "transparent",
      },
    }),

  // Create a rounding style for first and last day
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 0 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as ComponentType<CustomPickerDayProps>;
