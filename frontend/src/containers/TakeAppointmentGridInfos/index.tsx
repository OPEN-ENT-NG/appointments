import { FC } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import PlaceIcon from "@mui/icons-material/Place";
import TimerIcon from "@mui/icons-material/Timer";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  wrapperUserInfoStyle,
  topUserInfoStyle,
  pictureStyle,
  StatusCircle,
  displayNameStyle,
  professionStyle,
  bottomUserInfoStyle,
  itemStyle,
} from "./style";
import { TakeAppointmentGridInfosProps } from "./types";
import { NoAvatar } from "~/components/SVG/NoAvatar";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";
import { GREY } from "~/styles/color.constants";

// this container is the first part of TakeAppointmentModal
export const TakeAppointmentGridInfos: FC<TakeAppointmentGridInfosProps> = ({
  userInfos,
}) => {
  const { t } = useTranslation("appointments");
  const { gridsName, gridInfo, selectedGridName, handleGridChange } =
    useTakeAppointmentModalProvider();
  return (
    <Box sx={wrapperUserInfoStyle}>
      <Box sx={topUserInfoStyle}>
        <Box sx={pictureStyle}>
          {!userInfos.profilePicture && <NoAvatar fill={GREY} />}
          <StatusCircle status={userInfos.status} />
        </Box>
        <Box>
          <Typography sx={displayNameStyle}>{userInfos.displayName}</Typography>
          <Typography sx={professionStyle}>{userInfos.profession}</Typography>
        </Box>
      </Box>
      <Box sx={bottomUserInfoStyle}>
        <FormControl variant="standard">
          <InputLabel>
            {t("appointments.take.appointment.modal.time.grid")}
          </InputLabel>
          <Select
            variant="standard"
            value={selectedGridName}
            onChange={(e) => handleGridChange(e.target.value as string)}
          >
            {gridsName.map((gridName) => (
              <MenuItem key={gridName} value={gridName}>
                {gridName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={itemStyle}>
          {gridInfo.visio ? <VideoCameraFrontIcon /> : <VideocamOffIcon />}
          <Typography>
            {t(
              `appointments.take.appointment.modal.visio.${
                gridInfo.visio ? "possible" : "impossible"
              }`,
            )}
          </Typography>
        </Box>
        <Box sx={itemStyle}>
          <TimerIcon />
          <Typography>{gridInfo.slotDuration.toLocaleLowerCase()}</Typography>
        </Box>
        <Box sx={itemStyle}>
          <PlaceIcon />
          <Typography>{gridInfo.location}</Typography>
        </Box>
        <Box sx={itemStyle}>
          <ChatIcon />
          <Typography>{gridInfo.publicComment}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
