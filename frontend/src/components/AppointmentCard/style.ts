import { useEffect, useState } from "react";

import { Box, styled, SxProps } from "@mui/material";

import { StyledCardProps } from "./types";
import { columnBoxStyle, flexStartBoxStyle } from "~/styles/boxStyles";

export const StyledCard = styled(Box)<StyledCardProps>(({
  isAppointmentFromNotif,
  setAppointmentIdFromNotify,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isAppointmentFromNotif) {
      setIsAnimated(true);
      setTimeout(() => {
        setIsAnimated(false);
        setAppointmentIdFromNotify(null);
      }, 1000);
    }
  }, [isAppointmentFromNotif]);

  return {
    ...columnBoxStyle,
    padding: "2.4rem",
    borderRadius: "1rem",
    boxShadow: "0px 2px 8px 0px rgba(176, 176, 176, 0.25)",
    transition: "background-color 1s ease-in-out",
    backgroundColor: isAnimated && isAppointmentFromNotif ? "red" : "white",
    minWidth: "23rem",
    maxWidth: "23rem",
    gap: ".4rem",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 2px 8px 0px rgba(176, 176, 176, 0.75)",
    },
  };
});

export const pictureStyle: SxProps = {
  minWidth: "6rem",
  maxWidth: "6rem",
  minHeight: "6rem",
  maxHeight: "6rem",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  objectFit: "cover",
};

export const bottomWrapperBoxStyle: SxProps = {
  ...flexStartBoxStyle,
  gap: "1rem",
};

export const dateBoxStyle: SxProps = {
  ...columnBoxStyle,
  width: "4.2rem",
  alignItems: "center",
};

export const bottomRightBoxStyle: SxProps = {
  ...columnBoxStyle,
  justifyContent: "space-around",
  height: "7rem",
};

export const dividerStyle: SxProps = {
  borderColor: "divider",
  borderWidth: "0 0 0 2px",
};

export const iconsStyle: SxProps = {
  fontSize: "1.6rem",
};

export const rowBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
};

export const twoButtonsBoxStyle: SxProps = {
  ...flexStartBoxStyle,
  gap: "1rem",
};

export const twoButtonsStyle = {
  width: "50%",
};
