import { FC } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  EllipsisWithTooltip,
  Link,
  Typography,
} from "@cgi-learning-hub/ui";
import CommentIcon from "@mui/icons-material/Comment";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useTranslation } from "react-i18next";

import {
  bottomContainerStyle,
  dialogContentStyle,
  modalStyle,
  oneButtonBoxStyle,
  oneButtonStyle,
  pictureStyle,
  rowInfoStyle,
  topContainerStyle,
  twoButtonsBoxStyle,
  twoButtonsStyle,
} from "./style";
import { AppointmentInfosModalProps } from "./types";
import { AppointmentStateIcon } from "~/components/AppointmentCard/utils";
import {
  APPOINTMENT_STATE_VALUES,
  TEXT_DATE_FORMAT,
  TIME_FORMAT,
} from "~/core/constants";
import { APPOINTMENT_STATE } from "~/core/enums";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";

export const AppointmentInfosModal: FC<AppointmentInfosModalProps> = ({
  appointment,
}) => {
  const {
    isAppointmentModalOpen,
    handleCloseAppointmentModal,
    handleAcceptAppointment,
    handleCancelAppointment,
    handleRejectAppointment,
  } = useMyAppointments();
  const { t } = useTranslation("appointments");
  return (
    <Dialog open={isAppointmentModalOpen} onClose={handleCloseAppointmentModal}>
      <Box sx={modalStyle}>
        <DialogTitle>
          {t("appointments.my.appointment.infos.modal.title")}
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <Box sx={topContainerStyle}>
            <Box
              component="img"
              src={appointment.picture}
              alt={appointment.displayName}
              sx={pictureStyle}
            ></Box>
            <Box>
              <EllipsisWithTooltip>
                {appointment.displayName}
              </EllipsisWithTooltip>
              <EllipsisWithTooltip>
                {appointment.functions?.join(", ")}
              </EllipsisWithTooltip>
            </Box>
          </Box>
          <Box sx={bottomContainerStyle}>
            <Box sx={rowInfoStyle}>
              <AppointmentStateIcon
                state={appointment.state}
                isRequester={appointment.isRequester}
              />
              <Typography variant="body1">
                {t(APPOINTMENT_STATE_VALUES[appointment.state].i18nKey)}
              </Typography>
            </Box>
            <Box sx={rowInfoStyle}>
              <VideoCameraFrontIcon sx={{}} color="primary" />
              <Box>
                <Typography variant="body1">
                  {t("appointments.my.appointment.infos.modal.video.call")}
                </Typography>
                <Link href={appointment.videoCallLink} color={"primary"}>
                  {appointment.videoCallLink}
                </Link>
              </Box>
            </Box>
            <Box sx={rowInfoStyle}>
              <EventIcon sx={{}} />
              <Typography variant="body1">
                {t("appointments.my.appointment.infos.modal.date", {
                  date: appointment.beginDate
                    .locale("fr")
                    .format(TEXT_DATE_FORMAT),
                  beginTime: appointment.beginDate.format(TIME_FORMAT),
                  endTime: appointment.endDate.format(TIME_FORMAT),
                })}
              </Typography>
            </Box>
            <Box sx={rowInfoStyle}>
              <PlaceIcon sx={{}} />
              <Typography variant="body1">{appointment.place}</Typography>
            </Box>
            <Box sx={rowInfoStyle}>
              <CommentIcon />
              <Typography variant="body1">
                {appointment.publicComment}
              </Typography>
            </Box>
          </Box>
          {appointment.state === APPOINTMENT_STATE.CREATED &&
            (appointment.isRequester ? (
              <Button
                variant="outlined"
                color="error"
                sx={oneButtonStyle}
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                {t("appointments.cancel.request")}
              </Button>
            ) : (
              <Box sx={twoButtonsBoxStyle}>
                <Button
                  variant="outlined"
                  sx={twoButtonsStyle}
                  color="success"
                  onClick={() => handleAcceptAppointment(appointment.id)}
                >
                  {t("appointments.accept")}
                </Button>
                <Button
                  variant="outlined"
                  sx={twoButtonsStyle}
                  color="error"
                  onClick={() => handleRejectAppointment(appointment.id)}
                >
                  {t("appointments.refuse")}
                </Button>
              </Box>
            ))}
          {appointment.state === APPOINTMENT_STATE.ACCEPTED && (
            <Box sx={oneButtonBoxStyle}>
              <Button
                variant="outlined"
                color="error"
                sx={oneButtonStyle}
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                {t("appointments.cancel.request")}
              </Button>
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};
