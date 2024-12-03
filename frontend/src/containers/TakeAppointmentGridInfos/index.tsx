import { FC } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import PlaceIcon from "@mui/icons-material/Place";
import TimerIcon from "@mui/icons-material/Timer";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { NoAvatar } from "~/components/SVG/NoAvatar";
import { useTakeAppointmentModal } from "~/providers/TakeAppointmentModalProvider";
import { GREY } from "~/styles/color.constants";
import {
  bottomUserInfoStyle,
  displayNameStyle,
  functionsStyle,
  itemStyle,
  pictureStyle,
  StatusCircle,
  topUserInfoStyle,
  wrapperUserInfoStyle,
} from "./style";
import { TakeAppointmentGridInfosProps } from "./types";

// this container is the first part of TakeAppointmentModal
export const TakeAppointmentGridInfos: FC<TakeAppointmentGridInfosProps> = ({
  userInfos,
}) => {
  const { picture, displayName, functions } = userInfos;
  const { t } = useTranslation("appointments");
  const { grids, gridInfo, selectedGrid, handleGridChange } =
    useTakeAppointmentModal();

  return (
    <Box sx={wrapperUserInfoStyle}>
      <Box sx={topUserInfoStyle}>
        <Box sx={pictureStyle}>
          {!(picture && picture.startsWith("/userbook/avatar/")) ? (
            <NoAvatar fill={GREY} />
          ) : (
            <Box alt="user picture" component="img" src={picture} />
          )}
          <StatusCircle status={userInfos.status} />
        </Box>
        <Box>
          <Typography sx={displayNameStyle}>{displayName}</Typography>
          <Typography sx={functionsStyle}>{functions}</Typography>
        </Box>
      </Box>
      <Box sx={bottomUserInfoStyle}>
        <FormControl variant="standard">
          <InputLabel>
            {t("appointments.take.appointment.modal.time.grid")}
          </InputLabel>
          <Select
            variant="standard"
            value={selectedGrid}
            onChange={(e) => handleGridChange(e.target.value as string)}
          >
            {grids?.map((grid) => (
              <MenuItem key={grid.id} value={grid.name}>
                {grid.name}
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
