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

import { AppointmentStateIcon } from "~/components/AppointmentCard/utils";
import { UserPicture } from "~/components/UserPicture";
import {
  APPOINTMENT_STATE_VALUES,
  TEXT_DATE_FORMAT,
  TIME_FORMAT,
} from "~/core/constants";
import { APPOINTMENT_STATE } from "~/core/enums";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import {
  bottomContainerStyle,
  dialogContentStyle,
  greyIconStyle,
  iconStyle,
  modalStyle,
  oneButtonBoxStyle,
  oneButtonStyle,
  pictureStyle,
  rowInfoStyle,
  topContainerStyle,
  twoButtonsBoxStyle,
  twoButtonsStyle,
  userInfosBoxStyle,
} from "./style";
import { AppointmentInfosModalProps } from "./types";

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
            <Box sx={pictureStyle}>
              <UserPicture picture={appointment.picture} />
            </Box>
            <Box sx={userInfosBoxStyle}>
              <EllipsisWithTooltip
                typographyProps={{ variant: "h3", fontWeight: "bold" }}
              >
                {appointment.displayName}
              </EllipsisWithTooltip>
              <EllipsisWithTooltip typographyProps={{ variant: "h5" }}>
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
              <Typography variant="h5">
                {t(APPOINTMENT_STATE_VALUES[appointment.state].i18nKey)}
              </Typography>
            </Box>
            <Box sx={rowInfoStyle}>
              <VideoCameraFrontIcon sx={iconStyle} color="primary" />
              <Box>
                <Typography variant="h5">
                  {t("appointments.my.appointment.infos.modal.video.call")}
                </Typography>
                <Link href={appointment.videoCallLink} color={"primary"}>
                  {appointment.videoCallLink}
                </Link>
              </Box>
            </Box>
            <Box sx={rowInfoStyle}>
              <EventIcon sx={greyIconStyle} />
              <Typography variant="h5">
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
              <PlaceIcon sx={greyIconStyle} />
              <Typography variant="h5">{appointment.place}</Typography>
            </Box>
            <Box sx={rowInfoStyle}>
              <CommentIcon sx={greyIconStyle} />
              <Typography variant="h5">{appointment.publicComment}</Typography>
            </Box>
          </Box>
          {appointment.state === APPOINTMENT_STATE.CREATED &&
            (appointment.isRequester ? (
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
