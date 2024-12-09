import { common, IconButton } from "@cgi-learning-hub/ui";
import { Box, styled, SxProps } from "@mui/material";

import { columnBoxStyle, flexStartBoxStyle } from "~/styles/boxStyles";
import { BLACK, PURPLE } from "~/styles/color.constants";
import { BOLD_FONT, ITALIC_FONT } from "~/styles/fontStyle.constants";
import { ArrowButtonProps, ColumnSlotsWrapperProps } from "./types";

export const globalContainerStyle: SxProps = {
  display: "flex",
  gap: ".5rem",
  alignSelf: "stretch",
  width: "100%",
  flex: "1 0 60%",
};

export const weekSlotsWrapperStyle: SxProps = {
  ...flexStartBoxStyle,
  justifyContent: "space-around",
  gap: "1.6rem",
  alignItems: "flex-start",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.6rem",
    height: "0.8rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "divider",
    borderRadius: "0.3rem",
  },
  scrollbarGutter: "stable",
};

export const ArrowButton = styled(IconButton)<ArrowButtonProps>(
  ({ isVisible }) => ({
    width: "3rem",
    height: "3rem",
    padding: "0.3rem",
    display: isVisible ? "block" : "none",
    color: common.black,
  }),
);

export const ColumnSlotsWrapper = styled(Box)<ColumnSlotsWrapperProps>(
  ({ isEmpty, isToday }) => ({
    opacity: isEmpty ? "0.5" : "1",
    minWidth: "7.5rem",
    color: isToday ? PURPLE : "inherit",
  }),
);

export const daySlotsWrapperStyle: SxProps = {
  ...columnBoxStyle,
  gap: ".8rem",
};

export const headerStyle: SxProps = {
  ...flexStartBoxStyle,
  justifyContent: "space-around",
  gap: "1.6rem",
  height: "4rem",
  paddingRight: ".6rem",
};

export const daySlotsHeaderStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  lineHeight: "0",
};

export const weekDayStyle: SxProps = {
  ...BOLD_FONT,
  fontSize: "1.3rem",
  lineHeight: "1.2rem",
};

export const dayStyle: SxProps = {
  ...ITALIC_FONT,
  fontSize: "1.3rem",
};

export const visioOptionStyle: SxProps = {
  color: BLACK,
  fontSize: "1.4rem",
};

export const containerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "space-between",
  gap: "1rem",
};
