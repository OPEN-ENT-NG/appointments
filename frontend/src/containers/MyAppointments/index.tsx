import { FC } from "react";

import { Loader } from "@cgi-learning-hub/ui";
import { Box } from "@mui/material";

import {
  customCalendarBoxStyle,
  fisrtContainerStyle,
  loaderBoxStyle,
  mainContainerStyle,
} from "./style";
import { AppointmentCardList } from "../AppointmentCardList";
import { CustomDateCalendar } from "~/components/CustomDateCalendar";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";

export const MyAppointments: FC = () => {
  const { myAppointments, myAppointmentsDates } = useMyAppointments();

  const myPendingAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.PENDING];
  const myAcceptedAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.ACCEPTED];
  const myRejectedOrCanceledAppointments =
    myAppointments[MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED];

  return !myPendingAppointments ||
    !myAcceptedAppointments ||
    !myRejectedOrCanceledAppointments ||
    !myAppointmentsDates ? (
    <Box sx={loaderBoxStyle}>
      <Loader />
    </Box>
  ) : (
    <Box sx={mainContainerStyle}>
      <Box sx={fisrtContainerStyle}>
        <AppointmentCardList
          appointmentsType={MY_APPOINTMENTS_LIST_STATE.PENDING}
          myAppointments={myPendingAppointments}
        />
        <Box sx={customCalendarBoxStyle}>
          <CustomDateCalendar acceptedAppointmentsDates={myAppointmentsDates} />
        </Box>
      </Box>
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
    </Box>
  );
};
