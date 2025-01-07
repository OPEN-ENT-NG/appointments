import { FC } from "react";

import { Dayjs } from "dayjs";

import { AppointmentCardList } from "../AppointmentCardList";
import { CustomDateCalendar } from "~/components/CustomDateCalendar";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";

export const MyAppointments: FC = () => {
  const { myAppointments } = useMyAppointments();

  const mockedDates: Dayjs[] = [];

  return (
    <>
      <CustomDateCalendar acceptedAppointmentsDates={mockedDates} />
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
