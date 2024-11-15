import { SxProps } from "@mui/material";

import { flexStartBoxStyle } from "~/styles/boxStyles";
import { BLACK } from "~/styles/color.constants";

export const weekSlotsWrapperStyle: SxProps = {
    ...flexStartBoxStyle,
    alignItems: "flex-start",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
    width: "0.6rem",
    height: "0.8rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: "0.3rem",
  },
}

export const visioOptionStyle: SxProps = {
    color: BLACK,
    fontSize: "1.4rem",
}

export const containerStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "space-between",
}