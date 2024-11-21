// import { Theme } from "@cgi-learning-hub/theme";
import { SxProps } from "@mui/material";

import { flexStartBoxStyle } from "~/styles/boxStyles";
import { LIGHT_GREY, PURPLE } from "~/styles/color.constants";

export const stepperStyle = {
  ...flexStartBoxStyle,
  justifyContent: "space-around",
} as SxProps;

const stepperButtonStyle = {
  minWidth: "fit-content",
  width: "25%",
} as SxProps;

export const backButtonStyle = {
  ...stepperButtonStyle,
  color: LIGHT_GREY,
} as SxProps;

export const nextButtonStyle = {
  ...stepperButtonStyle,
  color: PURPLE,
} as SxProps;

export const saveButtonStyle = {
  ...stepperButtonStyle,
} as SxProps;
