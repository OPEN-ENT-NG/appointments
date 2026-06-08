import { FC } from "react";

import { Box, Loader, Typography } from "@cgi-learning-hub/ui";
import { useTheme } from "@mui/material";

import { DialogModal } from "~/components/DialogModal";
import { AppointmentsEmptyState } from "~/components/SVG/AppointmentsEmptyState";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";
import { AppointmentCardList } from "../AppointmentCardList";
import { AppointmentInfosModal } from "../AppointmentInfosModal";
import {
  emptyStateBoxStyle,
  emptyStateSVGStyle,
  loaderBoxStyle,
  mainContainerStyle,
} from "./style";
import { t } from "~/i18n";
import { ExportAppointmentsModal } from "../ExportAppointmentsModal";
import { useGlobal } from "~/providers/GlobalProvider";
import { ModalType } from "~/providers/GlobalProvider/enum";
import { ViewMode } from "~/components/SwitchView/enums";

export const MyAppointments: FC = () => {
  const {
    toggleModal,
    displayModals: { showExportModal },
  } = useGlobal();
  const {
    viewMode,
    myAppointments,
    myAppointmentsDates,
    dialogModalProps,
    selectedAppointment,
    handleExportMultipleAppointments,
  } = useMyAppointments();
  const theme = useTheme();

  const myPendingAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.PENDING];
  const myAcceptedAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.ACCEPTED];
  const myRejectedOrCanceledAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED];

  const isLoading =
    !myPendingAppointments ||
    !myAcceptedAppointments ||
    !myRejectedOrCanceledAppointments ||
    !myAppointmentsDates;

  const isMyPendingAppointmentsEmpty =
    myPendingAppointments && myPendingAppointments.total === 0;
  const isMyAcceptedAppointmentsEmpty =
    myAcceptedAppointments && myAcceptedAppointments.total === 0;
  const isMyRejectedOrCanceledAppointmentsEmpty =
    myRejectedOrCanceledAppointments &&
    myRejectedOrCanceledAppointments.total === 0;

  const isAllAppointmentsEmpty =
    isMyPendingAppointmentsEmpty &&
    isMyAcceptedAppointmentsEmpty &&
    isMyRejectedOrCanceledAppointmentsEmpty;

  if (isLoading) {
    return (
      <Box sx={loaderBoxStyle}>
        <Loader />
      </Box>
    );
  }

  if (isAllAppointmentsEmpty) {
    return (
      <Box sx={emptyStateBoxStyle}>
        <Typography variant="h2" color="primary" fontWeight="bold">
          {t("appointments.my.appointments")}
        </Typography>
        <Typography fontStyle={"italic"} variant="body1">
          {t("appointments.my.appointments.accepted.empty.state")}
        </Typography>
        <Box sx={emptyStateSVGStyle}>
          <AppointmentsEmptyState fill={theme.palette.primary.main} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {selectedAppointment && (
        <AppointmentInfosModal appointment={selectedAppointment} />
      )}
      <DialogModal {...dialogModalProps} />
      <ExportAppointmentsModal
        isOpen={showExportModal}
        handleClose={() => toggleModal(ModalType.EXPORT)}
        handleExport={() => {
          void handleExportMultipleAppointments(!isMyAcceptedAppointmentsEmpty);
        }}
      />
      <Box sx={mainContainerStyle}>
        {viewMode === ViewMode.CALENDAR && (
          <Box>
            <Typography variant="h2" color="primary" fontWeight="bold">
              {t("appointments.my.appointments")}
            </Typography>
            <Box>//TODO: replace with calendar component</Box>
          </Box>
        )}
        {viewMode === ViewMode.GRID && (
          <>
            <AppointmentCardList
              appointmentsType={MY_APPOINTMENTS_LIST_STATE.PENDING}
              myAppointments={myPendingAppointments}
            />
            <AppointmentCardList
              appointmentsType={MY_APPOINTMENTS_LIST_STATE.ACCEPTED}
              myAppointments={myAcceptedAppointments}
            />
            {myRejectedOrCanceledAppointments.total > 0 && (
              <AppointmentCardList
                appointmentsType={MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED}
                myAppointments={myRejectedOrCanceledAppointments}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
};
