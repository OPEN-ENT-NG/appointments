import { FC } from "react";

import { Box } from "@mui/material";

import { GREY } from "~/styles/color.constants";
import { NoAvatar } from "../SVG/NoAvatar";
import { UserPictureProps } from "./types";

export const UserPicture: FC<UserPictureProps> = ({ picture }) => {
  const isPictureValid = !!picture && picture.startsWith("/userbook/avatar/");
  return isPictureValid ? (
    <Box
      alt="user picture"
      component="img"
      src={picture}
      sx={{ objectFit: "cover" }}
    />
  ) : (
    <NoAvatar fill={GREY} />
  );
};
