import { FC, useEffect, useMemo, useRef } from "react";

import { Button, EllipsisWithTooltip } from "@cgi-learning-hub/ui";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { APPOINTMENT_STATE_VALUES, TIME_FORMAT } from "~/core/constants";
import { APPOINTMENT_STATE } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { UserPicture } from "../UserPicture";
import {
  bottomRightBoxStyle,
  bottomWrapperBoxStyle,
  dateBoxStyle,
  dividerStyle,
  iconsStyle,
  pictureStyle,
  rowBoxStyle,
  StyledCard,
  twoButtonsBoxStyle,
  twoButtonsStyle,
} from "./style";
import { AppointmentCardProps } from "./types";
import { AppointmentStateIcon } from "./utils";
import { UserPicture } from "../UserPicture";
import { APPOINTMENT_STATE_VALUES, TIME_FORMAT } from "~/core/constants";
import { APPOINTMENT_STATE, CONFIRM_MODAL_TYPE } from "~/core/enums";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";

export const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  const { t } = useTranslation("appointments");
  const { appointmentIdFromNotify, setAppointmentIdFromNotify } = useGlobal();

  const {
    handleAcceptAppointment,
    handleClickAppointment,
    handleOpenDialogModal,
  } = useMyAppointments();

  const isAppointmentFromNotif = useMemo(
    () => appointmentIdFromNotify === appointment.id,
    [appointmentIdFromNotify, appointment.id],
  );

  const appointmentCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAppointmentFromNotif && appointmentCardRef.current) {
      appointmentCardRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isAppointmentFromNotif]);

  return (
    <StyledCard
      ref={appointmentCardRef}
      isAppointmentFromNotif={isAppointmentFromNotif}
      setAppointmentIdFromNotify={setAppointmentIdFromNotify}
      onClick={() => handleClickAppointment(appointment.id)}
    >
      <Box sx={pictureStyle}>
        <UserPicture picture={appointment.picture} />
      </Box>
      <EllipsisWithTooltip
        typographyProps={{ variant: "h5", fontWeight: "bold" }}
      >
        {appointment.displayName}
      </EllipsisWithTooltip>
      <EllipsisWithTooltip typographyProps={{ variant: "body1" }}>
        {appointment.functions.join(", ")}
      </EllipsisWithTooltip>
      <Box sx={bottomWrapperBoxStyle}>
        <Box sx={dateBoxStyle}>
          <Typography fontSize={"3.6rem"} lineHeight={"1.2"}>
            {appointment.beginDate.format("D")}
          </Typography>
          <Typography variant="body1">
            {appointment.beginDate.locale("fr").format("MMM")}
          </Typography>
        </Box>
        <Divider
          sx={dividerStyle}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <Box sx={bottomRightBoxStyle}>
          <Box sx={rowBoxStyle}>
            <AccessTimeFilledIcon sx={iconsStyle} />
            <Typography variant="body1">
              {appointment.beginDate.format(TIME_FORMAT)} -{" "}
              {appointment.endDate.format(TIME_FORMAT)}
            </Typography>
          </Box>
          <Box sx={rowBoxStyle}>
            <AppointmentStateIcon
              state={appointment.state}
              isRequester={appointment.isRequester}
            />
            <Typography variant="body1">
              {t(APPOINTMENT_STATE_VALUES[appointment.state].i18nKey)}
            </Typography>
          </Box>
          {appointment.isVideoCall && appointment.videoCallLink && (
            <Box sx={rowBoxStyle}>
              <VideoCameraFrontIcon sx={iconsStyle} color="primary" />
              <Typography variant="body1">
                {t("appointments.videoconference")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {appointment.state === APPOINTMENT_STATE.CREATED &&
        (appointment.isRequester ? (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={(event) => {
              event?.stopPropagation();
              handleOpenDialogModal(
                CONFIRM_MODAL_TYPE.CANCEL_REQUEST,
                appointment.id,
              );
            }}
          >
            {t("appointments.cancel.request")}
          </Button>
        ) : (
          <Box sx={twoButtonsBoxStyle}>
            <Button
              variant="outlined"
              sx={twoButtonsStyle}
              color="success"
              onClick={(event) => {
                event?.stopPropagation();
                handleAcceptAppointment(appointment.id);
              }}
            >
              {t("appointments.accept")}
            </Button>
            <Button
              variant="outlined"
              sx={twoButtonsStyle}
              color="error"
              onClick={(event) => {
                event?.stopPropagation();
                handleOpenDialogModal(
                  CONFIRM_MODAL_TYPE.REJECT_REQUEST,
                  appointment.id,
                );
              }}
            >
              {t("appointments.refuse")}
            </Button>
          </Box>
        ))}
    </StyledCard>
  );
};
