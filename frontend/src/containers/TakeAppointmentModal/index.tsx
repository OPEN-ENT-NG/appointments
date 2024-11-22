import { FC } from "react";

import { IconButton, Button } from "@cgi-learning-hub/ui";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  closeIconStyle,
  contentBoxStyle,
  contentWrapperStyle,
  dividerStyle,
  modalBoxStyle,
  submitButtonStyle,
} from "./style";
import { TakeAppointmentModalProps } from "./types";
import { TakeAppointmentGridInfos } from "../TakeAppointmentGridInfos";
import { TakeAppointmentWeekSlots } from "../TakeAppointmentWeekSlots";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";

export const TakeAppointmentModal: FC<TakeAppointmentModalProps> = ({
  userInfos,
}) => {
  const { isModalOpen, setIsModalOpen, selectedSlotId } =
    useTakeAppointmentModalProvider();
  const { t } = useTranslation("appointments");

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      disableAutoFocus
    >
      <Box sx={modalBoxStyle}>
        <Box sx={contentBoxStyle}>
          <Box sx={spaceBetweenBoxStyle}>
            <Typography variant="h3">
              {t("appointments.take.appointment.modal.title")}
            </Typography>
            <IconButton
              sx={closeIconStyle}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={contentWrapperStyle}>
            <TakeAppointmentGridInfos userInfos={userInfos} />
            <Divider sx={dividerStyle} orientation="vertical" flexItem />
            <TakeAppointmentWeekSlots />
          </Box>
          <Box sx={submitButtonStyle}>
            <Button
              disabled={!selectedSlotId}
              variant="contained"
              startIcon={<EventAvailableIcon />}
            >
              {t("appointments.take.appointment.modal.submit")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
