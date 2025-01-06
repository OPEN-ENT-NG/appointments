import { FC } from "react";

import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";
import { AppointmentCardList } from "../AppointmentCardList";

export const MyAppointments: FC = () => {
  const { myAppointments } = useMyAppointments();

  return (
    <>
      {myAppointments[MY_APPOINTMENTS_LIST_STATE.PENDING] ? (
        <AppointmentCardList
          appointmentsType={MY_APPOINTMENTS_LIST_STATE.PENDING}
          myAppointments={myAppointments[MY_APPOINTMENTS_LIST_STATE.PENDING]}
        />
      ) : null}
      {myAppointments[MY_APPOINTMENTS_LIST_STATE.ACCEPTED] ? (
        <AppointmentCardList
          appointmentsType={MY_APPOINTMENTS_LIST_STATE.ACCEPTED}
          myAppointments={myAppointments[MY_APPOINTMENTS_LIST_STATE.ACCEPTED]}
        />
      ) : null}
      {myAppointments[MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED] ? (
        <AppointmentCardList
          appointmentsType={MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED}
          myAppointments={
            myAppointments[MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]
          }
        />
      ) : null}
    </>
  );
};
