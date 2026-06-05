import { styled, SxProps } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { RotativeExpandMoreRoundedIconProps } from "./type";

export const tableStyle: SxProps = {
  "tbody>tr:nth-of-type(even)>*": {
    backgroundColor: "grey.lighter",
  },
  "tr>*": {
    padding: "10px 12px",
    fontSize: "1.4rem",
  },
  borderRadius: "8px",
  overflow: "hidden",
};

export const avatarColumnStyle: SxProps = {
  width: "10%",
  height: "6rem",
};

export const nameColumnStyle: SxProps = {
  width: "50%",
  height: "6rem",
};

export const rightsColumnStyle: SxProps = {
  width: "30%",
  height: "6rem",
  textAlign: "center",
  color: "white !important",
};

export const actionColumnStyle: SxProps = {
  width: "10%",
  height: "6rem",
};

export const avatarStyle: SxProps = {
  width: "2.4rem",
  height: "2.4rem",
  backgroundColor: "white",
};

export const defaultAvatarStyle: SxProps = {
  width: "120%",
  height: "120%",
  marginTop: "20%",
  color: "primary.darker",
};

export const RotativeExpandMoreRoundedIcon = styled(
  ExpandMoreRoundedIcon,
)<RotativeExpandMoreRoundedIconProps>(({ showBookmark }) => ({
  transition: "rotate 0.2s ease-out",
  rotate: showBookmark ? "-180deg" : "0deg",
}));
