import { Button, common } from "@cgi-learning-hub/ui";
import { Box, styled, SxProps } from "@mui/material";

import { DaySlotsWrapperProps } from "./types";
import { columnBoxStyle } from "~/styles/boxStyles";
import { BLACK, LIGHTER_PURPLE, PURPLE } from "~/styles/color.constants";
import { BOLD_FONT, IMPORTANT, ITALIC_FONT } from "~/styles/fontStyle.constants";

export const DaySlotsWrapper = styled(Box)<DaySlotsWrapperProps>(
  ({ isEmpty }) => ({
    ...columnBoxStyle,
    gap: ".8rem",
    justifyContent: "flex-start",
    opacity: isEmpty ? ".5" : "1",
  }),
);

export const daySlotsHeaderStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  lineHeight: "0",
};

export const TimeSlot = styled(Button)({
  width: "6.2rem",
  height: "3.4rem",
  borderRadius: ".8rem" + IMPORTANT,
  backgroundColor: LIGHTER_PURPLE + IMPORTANT,
  color: PURPLE + IMPORTANT,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold" + IMPORTANT,
  fontSize: "1.3rem" + IMPORTANT,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: PURPLE + IMPORTANT,
    color: common.white + IMPORTANT,
  },
});

export const weekDayStyle: SxProps = {
  ...BOLD_FONT,
  fontSize: "1.3rem",
  lineHeight: "1.2rem",
  color: BLACK,
};

export const dayStyle: SxProps = {
  ...ITALIC_FONT,
  fontSize: "1.3rem",
  color: BLACK,
};

export const timeSlotWrapperStyle: SxProps = {
  display: "flex",
  gap: ".8rem",
  justifyContent: "center",
  alignItems: "flex-start",
  flexWrap: "wrap",
  maxHeight: "calc(100vh - 45rem)",
  //   overflowY: "auto",
  //   "&::-webkit-scrollbar": {
  //   width: "0.6rem",
  //   height: "0.8rem",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   backgroundColor: "rgba(0, 0, 0, 0.12)",
  //   borderRadius: "0.3rem",
  // },
};

export const noSlotsStyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "6.2rem",
  height: "3.4rem",
  "& > .MuiSvgIcon-root": {
    fontSize: "1.8rem",
  },
};
