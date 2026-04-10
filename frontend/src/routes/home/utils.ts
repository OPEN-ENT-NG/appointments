import { APPOINTMENT_STATE } from "~/core/enums";
import { AppointmentsType } from "~/providers/MyAppointmentsProvider/types";

export const shouldDisplayExportButton = (myAppointments: AppointmentsType): boolean => {
  const nbAcceptedAppointments = myAppointments.accepted?.total ?? 0;
  if (nbAcceptedAppointments > 0) return true;
  const nbCanceledAppointments = myAppointments.rejected_or_canceled?.appointments
    .filter((a) => a.state === APPOINTMENT_STATE.CANCELED)
    .length ?? 0;
  return nbCanceledAppointments > 0;
};
