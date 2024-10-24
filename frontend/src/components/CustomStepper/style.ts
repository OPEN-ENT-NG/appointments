import { flexStartBoxStyle } from "~/styles/boxStyles";

export const stepperStyle = {
  ...flexStartBoxStyle,
  justifyContent: "space-around",
};

const stepperButtonStyle = {
  width: "25%",
  fontWeight: "bold",
};

export const backButtonStyle = {
  ...stepperButtonStyle,
  color: "red",
};

export const nextButtonStyle = {
  ...stepperButtonStyle,
  color: "green",
};

export const saveButtonStyle = {
  ...stepperButtonStyle,
  color: "blue",
};
