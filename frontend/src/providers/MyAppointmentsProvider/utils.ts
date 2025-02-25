import { APPOINTMENT_STATE, CONFIRM_MODAL_TYPE } from "~/core/enums";
import { MY_APPOINTMENTS_LIST_STATE } from "./enum";

export const initialAppointments = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: undefined,
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: undefined,
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: undefined,
};

export const initialPages = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: 1,
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: 1,
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: 1,
};

export const initialLimits = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: 0,
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: 0,
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: 0,
};

export const states = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: [APPOINTMENT_STATE.CREATED],
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: [APPOINTMENT_STATE.ACCEPTED],
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: [
    APPOINTMENT_STATE.REFUSED,
    APPOINTMENT_STATE.CANCELED,
  ],
};

export const initialDialogModalProps = {
  open: false,
  type: CONFIRM_MODAL_TYPE.CANCEL_APPOINTMENT,
  handleCancel: () => {},
  handleConfirm: () => {},
};
