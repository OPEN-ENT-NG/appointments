import { MODAL_SIZE } from "./enum";
import { UserCardInfos } from "~/services/api/CommunicationService/types";

export interface TakeAppointmentModalProps {
  userInfos: UserCardInfos;
}

export interface ContentWrapperProps {
  modalSize: MODAL_SIZE;
}
