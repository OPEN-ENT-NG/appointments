import { Box, common, IconButton, styled, SxProps } from "@cgi-learning-hub/ui";

import {
  columnBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/styles/boxStyles";
import { BOLD_FONT, ITALIC_FONT } from "~/styles/fontStyle.constants";
import {
  ArrowButtonProps,
  ColumnHeaderProps,
  ColumnSlotsWrapperProps,
  NoSlotsProps,
} from "./types";

export const globalContainerStyle: SxProps = {
  display: "flex",
  gap: ".5rem",
  alignSelf: "stretch",
  width: "100%",
  flex: "1 0 60%",
};

export const weekSlotsWrapperStyle: SxProps = {
  ...flexStartBoxStyle,
  justifyContent: "flex-start",
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
    visibility: isVisible ? "visible" : "hidden",
    color: common.black,
  }),
);

export const ColumnHeader = styled(Box)<ColumnHeaderProps>(
  ({
    isEmpty,
    isToday,
    theme: {
      palette: {
        primary: { main },
      },
    },
  }) => ({
    opacity: isEmpty ? "0.5" : "1",
    minWidth: "7.5rem",
    color: isToday ? main : "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "0",
  }),
);

export const ColumnSlotsWrapper = styled(Box)<ColumnSlotsWrapperProps>(
  ({ isEmpty, isVideoCallOptionVisible }) => ({
    opacity: isEmpty ? "0.5" : "1",
    minWidth: "7.5rem",
    height: isVideoCallOptionVisible ? "31rem" : "36rem",
    minHeight: "18rem",
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

export const weekDayStyle: SxProps = {
  ...BOLD_FONT,
  fontSize: "1.3rem",
  lineHeight: "1.2rem",
};

export const dayStyle: SxProps = {
  ...ITALIC_FONT,
  fontSize: "1.3rem",
};

export const containerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "flex-start",
  gap: "1rem",
};

export const GoToNextTimeSlot = styled(Box)<NoSlotsProps>(
  ({ isVideoCallOptionVisible }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "14rem",
    height: isVideoCallOptionVisible ? "26.6rem" : "31.6rem",
    width: "100%",
  }),
);

export const nextTimeSlotButtonStyle = {
  padding: "2rem",
  boxShadow: "0px 2px 8px 0px rgba(156, 156, 156, 0.25)",
};

export const NoSlots = styled(Box)<NoSlotsProps>(
  ({ isVideoCallOptionVisible }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "18rem",
    height: isVideoCallOptionVisible ? "31rem" : "36rem",
    width: "100%",
    padding: "2rem",
  }),
);

export const emptyStateStyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.5rem",
  backgroundColor: "grey.light",
  width: "100%",
  height: "100%",
  boxShadow: "0px 2px 8px 0px rgba(156, 156, 156, 0.25)",
};

export const noSlotsWrapperStyle: SxProps = {
  ...flexStartBoxStyle,
  ...spaceBetweenBoxStyle,
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

export const noSlotsStyle: SxProps = {
  display: "flex",
  opacity: "0.5",
  justifyContent: "center",
  alignItems: "center",
  width: "7.8rem",
  height: "3.4rem",
  "& > .MuiSvgIcon-root": {
    fontSize: "1.8rem",
  },
};

export const videoCallOptionStyle: SxProps = {
  ...flexStartBoxStyle,
  filter: "blur(0)",
};
