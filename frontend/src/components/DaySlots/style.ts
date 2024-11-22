import { Button, common } from "@cgi-learning-hub/ui";
import { styled, SxProps } from "@mui/material";

import { TimeSlotProps } from "./types";
import { BLACK, LIGHTER_PURPLE, PURPLE } from "~/styles/color.constants";
import { IMPORTANT } from "~/styles/fontStyle.constants";

export const TimeSlot = styled(Button)<TimeSlotProps>(({ selected }) => ({
  width: "6.2rem",
  height: "3.4rem",
  borderRadius: ".8rem" + IMPORTANT,
  backgroundColor: selected ? PURPLE + IMPORTANT : LIGHTER_PURPLE + IMPORTANT,
  color: selected ? common.white + IMPORTANT : BLACK + IMPORTANT,
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
}));

export const timeSlotWrapperStyle: SxProps = {
  display: "flex",
  gap: ".8rem",
  justifyContent: "center",
  alignItems: "flex-start",
  flexWrap: "wrap",
  maxHeight: "calc(100vh - 45rem)",
  filter: "blur(0)",
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
