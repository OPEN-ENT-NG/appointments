import { Box, styled, SxProps } from "@cgi-learning-hub/ui";

import {
  columnBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/styles/boxStyles";
import {
  USER_STATUS_AVAILABLE_COLOR,
  USER_STATUS_UNAVAILABLE_COLOR,
} from "~/styles/color.constants";
import { StatusColorProps, WrapperUserCardProps } from "./types";

export const WrapperUserCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAvailable",
})<WrapperUserCardProps>(({ isAvailable }) => ({
  ...flexStartBoxStyle,
  gap: "1rem",
  maxWidth: "33rem",
  width: "100%",
  height: "11rem",
  flex: "1 1 25rem",
  borderRadius: "1rem",
  padding: "1.2rem 1.6rem",
  opacity: isAvailable ? 1 : 0.7,
  boxShadow: "0px 2px 8px 0px #9B9B9B40",
  "&:hover": {
    cursor: isAvailable && "pointer",
    boxShadow: isAvailable && "0px 6px 16px 0px rgba(0, 0, 0, 0.1)",
  },
}));

export const StatusColor = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAvailable",
})<StatusColorProps>(({ isAvailable }) => ({
  minWidth: "0.7rem",
  maxWidth: "0.7rem",
  minHeight: "0.7rem",
  maxHeight: "0.7rem",
  borderRadius: "50%",
  backgroundColor: isAvailable
    ? USER_STATUS_AVAILABLE_COLOR
    : USER_STATUS_UNAVAILABLE_COLOR,
}));

export const statusBoxStyle: SxProps = {
  ...flexStartBoxStyle,
  gap: "0.5rem",
};

export const pictureStyle: SxProps = {
  minWidth: "6rem",
  maxWidth: "6rem",
  minHeight: "6rem",
  maxHeight: "6rem",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
};

export const textWrapperStyle: SxProps = {
  ...spaceBetweenBoxStyle,
  overflow: "hidden",
  height: "100%",
  alignItems: "flex-start",
  flexDirection: "column",
};

export const topTextWrapperStyle: SxProps = {
  ...columnBoxStyle,
  gap: ".2rem",
};
