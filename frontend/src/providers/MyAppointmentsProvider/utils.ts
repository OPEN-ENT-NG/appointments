import { APPOINTMENT_STATE, CONFIRM_MODAL_TYPE } from "~/core/enums";
import { MY_APPOINTMENTS_LIST_STATE } from "./enum";
import { ViewMode } from "~/components/SwitchView/enums";
import { odeServices } from "@edifice.io/client";
import { APPOINTMENTS } from "~/core/constants";

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
  handleUpdateComment: () => {},
  handleCancel: () => {},
  handleConfirm: () => {},
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Preferences

const getAppointmentsPreference = async (prefKey: string) => {
  try {
    const result: { [key: string]: string } = await odeServices
      .conf()
      .getPreference(APPOINTMENTS);
    return result[prefKey];
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const fetchViewModePreference = async () => {
  try {
    const viewModePref = await getAppointmentsPreference("viewModePreference");
    return viewModePref as ViewMode;
  } catch (error) {
    console.error("ViewMode fetch request Error", error);
    return ViewMode.GRID;
  }
};

const savePreference = async (
  key: string,
  value: string | number | boolean,
) => {
  const result = await odeServices
    .conf()
    .savePreference(APPOINTMENTS, JSON.stringify({ [key]: value }));
  return result;
};

export const updateViewModePreference = async (newViewMode: ViewMode) => {
  try {
    await savePreference("viewModePreference", newViewMode);
  } catch (error) {
    console.error("ViewMode update request Error", error);
  }
};