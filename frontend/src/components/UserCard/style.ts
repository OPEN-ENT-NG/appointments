import { Box, styled, SxProps } from "@mui/material";

import { StatusColorProps, WrapperUserCardProps } from "./types";
import { USER_STATUS } from "~/providers/FindAppointmentsProvider/enums";
import {
  columnBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/styles/boxStyles";
import {
  BLACK,
  GREY,
  USER_STATUS_AVAILABLE_COLOR,
  USER_STATUS_UNAVAILABLE_COLOR,
} from "~/styles/color.constants";
import { BOLD_FONT, ITALIC_FONT } from "~/styles/fontStyle.constants";

export const WrapperUserCard = styled(Box)<WrapperUserCardProps>(
  ({ status }) => ({
    ...flexStartBoxStyle,
    gap: "1rem",
    maxWidth: "33rem",
    width: "100%",
    height: "11rem",
    flex: "1 1 25rem",
    borderRadius: "1rem",
    padding: "1.2rem 1.6rem",
    opacity: status === USER_STATUS.AVAILABLE ? 1 : 0.7,
    boxShadow: "0px 2px 8px 0px #9B9B9B40",
    "&:hover": {
      cursor: status === USER_STATUS.AVAILABLE && "pointer",
      boxShadow:
        status === USER_STATUS.AVAILABLE &&
        "0px 6px 16px 0px rgba(0, 0, 0, 0.1)",
    },
  }),
);

export const StatusColor = styled(Box)<StatusColorProps>(({ status }) => ({
  minWidth: "0.7rem",
  maxWidth: "0.7rem",
  minHeight: "0.7rem",
  maxHeight: "0.7rem",
  borderRadius: "50%",
  backgroundColor:
    status === USER_STATUS.AVAILABLE
      ? USER_STATUS_AVAILABLE_COLOR
      : USER_STATUS_UNAVAILABLE_COLOR,
}));

export const statusBoxStyle: SxProps = {
  ...flexStartBoxStyle,
  gap: "0.5rem",
};

export const noAvatarStyle: SxProps = {
  minWidth: "6rem",
  maxWidth: "6rem",
  minHeight: "6rem",
  maxHeight: "6rem",
  borderRadius: "50%",
  overflow: "hidden",
};

export const textWrapperStyle: SxProps = {
  ...spaceBetweenBoxStyle,
  overflow: "hidden",
  height: "100%",
  alignItems: "flex-start",
  flexDirection: "column",
};

export const displayNameStyle: SxProps = {
  ...BOLD_FONT,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const professionStyle: SxProps = {
  fontSize: "1.3rem",
  color: BLACK,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const lastAppointmentStyle: SxProps = {
  ...ITALIC_FONT,
  fontSize: "1.3rem",
  color: BLACK,
};

export const statusStyle: SxProps = {
  ...BOLD_FONT,
  fontSize: "1.3rem",
  color: GREY,
};

export const topTextWrapperStyle: SxProps = {
  ...columnBoxStyle,
  gap: ".2rem",
};