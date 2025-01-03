import { FC } from "react";

import { AppointmentCardList } from "../AppointmentCardList";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";

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
    </>
  );
};
