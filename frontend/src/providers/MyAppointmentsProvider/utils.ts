import { MY_APPOINTMENTS_LIST_STATE } from "./enum";
import { APPOINTMENT_STATE } from "~/core/enums";

export const initialPages = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: 1,
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: 1,
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: 1,
};

export const initialLimits = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: 4,
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: 5,
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: 5,
};

export const states = {
  [MY_APPOINTMENTS_LIST_STATE.PENDING]: [APPOINTMENT_STATE.CREATED],
  [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: [APPOINTMENT_STATE.ACCEPTED],
  [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: [
    APPOINTMENT_STATE.REJECTED,
    APPOINTMENT_STATE.CANCELED,
  ],
};