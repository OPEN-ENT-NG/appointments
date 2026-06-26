import { AppointmentsType } from "~/providers/MyAppointmentsProvider/types";
import { Event } from "./types";
import { MyMinimalAppointment } from "~/services/api/AppointmentService/types";
import { APPOINTMENT_STATE } from "~/core/enums";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { hexWithOpacity } from "~/core/utils";
import { MY_APPOINTMENTS_LIST_STATE } from "~/providers/MyAppointmentsProvider/enum";
import dayjs from "dayjs";

const EVENT_ICON_CONFIG = {
  [APPOINTMENT_STATE.CREATED]: { color: "warning.main", icon: HelpRoundedIcon },
  [APPOINTMENT_STATE.ACCEPTED]: {
    color: "success.main",
    icon: CheckCircleRoundedIcon,
  },
  [APPOINTMENT_STATE.CANCELED]: {
    color: "error.main",
    icon: CancelRoundedIcon,
  },
  [APPOINTMENT_STATE.REFUSED]: {
    color: "error.main",
    icon: DoNotDisturbOnRoundedIcon,
  },
};

export const createEventsFrom = (appointments: AppointmentsType): Event[] => {
  return Object.entries(appointments).flatMap(
    ([, myAppointments]) =>
      myAppointments?.appointments.map((appointment: MyMinimalAppointment) =>
        createEventFrom(appointment),
      ) ?? [],
  );
};

const createEventFrom = (appointment: MyMinimalAppointment): Event => ({
  id: appointment.id.toString(),
  title: appointment.displayName,
  start: appointment.beginDate.toISOString(),
  end: appointment.endDate.toISOString(),
  extendedProps: {
    comment: appointment.comment,
    colors: {
      background: hexWithOpacity(appointment.gridColor, 12.5),
      border: appointment.gridColor,
      icon: EVENT_ICON_CONFIG[appointment.state].color,
    },
    IconComponent: getIconComponent(appointment.state, appointment.isRequester),
  },
});

const getIconComponent = (state: APPOINTMENT_STATE, isRequester: boolean) => {
  if (state === APPOINTMENT_STATE.CREATED) {
    return isRequester ? WarningRoundedIcon : HelpRoundedIcon;
  }
  return EVENT_ICON_CONFIG[state].icon;
};

//TODO: delete later
export const generateSampleEvents = (): AppointmentsType => {
  const today = new Date();
  const d = (dayOffset: number, h: number, m: number) => {
    const dt = new Date(today);
    dt.setDate(dt.getDate() - dt.getDay() + 1 + dayOffset); // lundi = 0
    dt.setHours(h, m, 0, 0);
    return dt.toISOString();
  };

  const SAMPLE_EVENTS = [
    {
      id: 1,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Chirurgien", "Cardiologue"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(0, 10, 0)),
      endDate: dayjs(d(0, 11, 0)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Consultation de suivi post-opératoire.",
      commentatorDisplayName: "Dr. Martin",
      commentatorPicture: "https://i.pravatar.cc/150?img=10",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#4A90D9",
    },
    {
      id: 2,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Généraliste"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(0, 11, 30)),
      endDate: dayjs(d(0, 12, 0)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/abc123",
      comment: "Renouvellement d'ordonnance.",
      commentatorDisplayName: "Dr. Dupont",
      commentatorPicture: "https://i.pravatar.cc/150?img=11",
      state: APPOINTMENT_STATE.CREATED,
      isRequester: false,
      gridColor: "#E67E22",
    },
    {
      id: 3,
      displayName: "Marie Dupont",
      functions: ["Dermatologue"],
      picture: "https://i.pravatar.cc/150?img=2",
      beginDate: dayjs(d(1, 10, 0)),
      endDate: dayjs(d(1, 10, 45)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Examen de contrôle annuel.",
      commentatorDisplayName: "Dr. Leblanc",
      commentatorPicture: "https://i.pravatar.cc/150?img=12",
      state: APPOINTMENT_STATE.REFUSED,
      isRequester: true,
      gridColor: "#2ECC71",
    },
    {
      id: 4,
      displayName: "Marie Dupont",
      functions: ["Ophtalmologue"],
      picture: "https://i.pravatar.cc/150?img=2",
      beginDate: dayjs(d(1, 11, 0)),
      endDate: dayjs(d(1, 11, 30)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Bilan de vue complet.",
      commentatorDisplayName: "Dr. Bernard",
      commentatorPicture: "https://i.pravatar.cc/150?img=13",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: false,
      gridColor: "#9B59B6",
    },
    {
      id: 5,
      displayName: "Marie Dupont",
      functions: ["Kinésithérapeute"],
      picture: "https://i.pravatar.cc/150?img=2",
      beginDate: dayjs(d(1, 11, 30)),
      endDate: dayjs(d(1, 12, 0)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Séance de rééducation épaule.",
      commentatorDisplayName: "Dr. Simon",
      commentatorPicture: "https://i.pravatar.cc/150?img=14",
      state: APPOINTMENT_STATE.CANCELED,
      isRequester: true,
      gridColor: "#E74C3C",
    },
    {
      id: 6,
      displayName: "Thomas Leblanc",
      functions: ["Neurologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 30)),
      endDate: dayjs(d(2, 10, 35)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/xyz789",
      comment: "Suivi migraines chroniques.",
      commentatorDisplayName: "Dr. Moreau",
      commentatorPicture: "https://i.pravatar.cc/150?img=15",
      state: APPOINTMENT_STATE.CREATED,
      isRequester: false,
      gridColor: "#1ABC9C",
    },
    {
      id: 7,
      displayName: "Thomas Leblanc",
      functions: ["Rhumatologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 35)),
      endDate: dayjs(d(2, 10, 40)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Douleurs articulaires persistantes.",
      commentatorDisplayName: "Dr. Petit",
      commentatorPicture: "https://i.pravatar.cc/150?img=16",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#F39C12",
    },
    {
      id: 56,
      displayName: "Thomas Leblanc",
      functions: ["Gastro-entérologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 40)),
      endDate: dayjs(d(2, 10, 45)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Résultats coloscopie à analyser.",
      commentatorDisplayName: "Dr. Garcia",
      commentatorPicture: "https://i.pravatar.cc/150?img=17",
      state: APPOINTMENT_STATE.REFUSED,
      isRequester: false,
      gridColor: "#3498DB",
    },
    {
      id: 57,
      displayName: "Thomas Leblanc",
      functions: ["Endocrinologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 45)),
      endDate: dayjs(d(2, 10, 50)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/def456",
      comment: "Bilan thyroïdien.",
      commentatorDisplayName: "Dr. Laurent",
      commentatorPicture: "https://i.pravatar.cc/150?img=18",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#E91E63",
    },
    {
      id: 58,
      displayName: "Thomas Leblanc",
      functions: ["Pneumologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 50)),
      endDate: dayjs(d(2, 10, 55)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Contrôle asthme saisonnier.",
      commentatorDisplayName: "Dr. Rousseau",
      commentatorPicture: "https://i.pravatar.cc/150?img=19",
      state: APPOINTMENT_STATE.CREATED,
      isRequester: false,
      gridColor: "#00BCD4",
    },
    {
      id: 59,
      displayName: "Thomas Leblanc",
      functions: ["Cardiologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 10, 55)),
      endDate: dayjs(d(2, 11, 0)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "ECG de contrôle.",
      commentatorDisplayName: "Dr. Fontaine",
      commentatorPicture: "https://i.pravatar.cc/150?img=20",
      state: APPOINTMENT_STATE.CANCELED,
      isRequester: true,
      gridColor: "#FF5722",
    },
    {
      id: 100,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Chirurgien"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(2, 11, 10)),
      endDate: dayjs(d(2, 11, 40)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Préparation intervention programmée.",
      commentatorDisplayName: "Dr. Martin",
      commentatorPicture: "https://i.pravatar.cc/150?img=10",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: false,
      gridColor: "#4A90D9",
    },
    {
      id: 101,
      displayName: "Marie Dupont",
      functions: ["Dermatologue"],
      picture: "https://i.pravatar.cc/150?img=2",
      beginDate: dayjs(d(2, 11, 30)),
      endDate: dayjs(d(2, 12, 0)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/ghi012",
      comment: "Suivi traitement acné.",
      commentatorDisplayName: "Dr. Leblanc",
      commentatorPicture: "https://i.pravatar.cc/150?img=12",
      state: APPOINTMENT_STATE.CREATED,
      isRequester: true,
      gridColor: "#2ECC71",
    },
    {
      id: 102,
      displayName: "Sophie Martin",
      functions: ["Pédiatre"],
      picture: "https://i.pravatar.cc/150?img=4",
      beginDate: dayjs(d(2, 11, 0)),
      endDate: dayjs(d(2, 11, 30)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Vaccins 18 mois.",
      commentatorDisplayName: "Dr. Dupont",
      commentatorPicture: "https://i.pravatar.cc/150?img=11",
      state: APPOINTMENT_STATE.REFUSED,
      isRequester: false,
      gridColor: "#FF9800",
    },
    {
      id: 103,
      displayName: "Thomas Leblanc",
      functions: ["Cardiologue"],
      picture: "https://i.pravatar.cc/150?img=3",
      beginDate: dayjs(d(2, 11, 10)),
      endDate: dayjs(d(2, 12, 40)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/jkl345",
      comment: "Résultats holter cardiaque.",
      commentatorDisplayName: "Dr. Fontaine",
      commentatorPicture: "https://i.pravatar.cc/150?img=20",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#FF5722",
    },
    {
      id: 8,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Généraliste"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(3, 10, 0)),
      endDate: dayjs(d(3, 10, 15)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Certificat médical sport.",
      commentatorDisplayName: "Dr. Martin",
      commentatorPicture: "https://i.pravatar.cc/150?img=10",
      state: APPOINTMENT_STATE.CANCELED,
      isRequester: false,
      gridColor: "#4A90D9",
    },
    {
      id: 9,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Chirurgien"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(3, 11, 30)),
      endDate: dayjs(d(3, 12, 0)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Consultation pré-opératoire.",
      commentatorDisplayName: "Dr. Bernard",
      commentatorPicture: "https://i.pravatar.cc/150?img=13",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#4A90D9",
    },
    {
      id: 10,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Ophtalmologue"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(4, 10, 0)),
      endDate: dayjs(d(4, 10, 35)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/mno678",
      comment: "Renouvellement verres correcteurs.",
      commentatorDisplayName: "Dr. Simon",
      commentatorPicture: "https://i.pravatar.cc/150?img=14",
      state: APPOINTMENT_STATE.CREATED,
      isRequester: false,
      gridColor: "#4A90D9",
    },
    {
      id: 11,
      displayName: "Sophie Martin",
      functions: ["Kinésithérapeute"],
      picture: "https://i.pravatar.cc/150?img=4",
      beginDate: dayjs(d(4, 11, 30)),
      endDate: dayjs(d(4, 12, 0)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Rééducation genou post-entorse.",
      commentatorDisplayName: "Dr. Garcia",
      commentatorPicture: "https://i.pravatar.cc/150?img=17",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#FF9800",
    },
    {
      id: 12,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Neurologue"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(5, 10, 0)),
      endDate: dayjs(d(5, 10, 20)),
      isVideoCall: false,
      videoCallLink: "",
      comment: "Bilan mémoire et concentration.",
      commentatorDisplayName: "Dr. Moreau",
      commentatorPicture: "https://i.pravatar.cc/150?img=15",
      state: APPOINTMENT_STATE.REFUSED,
      isRequester: false,
      gridColor: "#4A90D9",
    },
    {
      id: 13,
      displayName: "Jesper Vachon Delaflamberge",
      functions: ["Cardiologue", "Généraliste"],
      picture: "https://i.pravatar.cc/150?img=1",
      beginDate: dayjs(d(5, 11, 30)),
      endDate: dayjs(d(5, 12, 15)),
      isVideoCall: true,
      videoCallLink: "https://meet.example.com/pqr901",
      comment: "Suivi tension et traitement.",
      commentatorDisplayName: "Dr. Fontaine",
      commentatorPicture: "https://i.pravatar.cc/150?img=20",
      state: APPOINTMENT_STATE.ACCEPTED,
      isRequester: true,
      gridColor: "#4A90D9",
    },
  ] as MyMinimalAppointment[];

  const pendings = SAMPLE_EVENTS.filter(
    (e) => e.state === APPOINTMENT_STATE.CREATED,
  );
  const accepted = SAMPLE_EVENTS.filter(
    (e) => e.state === APPOINTMENT_STATE.ACCEPTED,
  );
  const rejectedOrCanceled = SAMPLE_EVENTS.filter(
    (e) =>
      e.state === APPOINTMENT_STATE.REFUSED ||
      e.state === APPOINTMENT_STATE.CANCELED,
  );

  return {
    [MY_APPOINTMENTS_LIST_STATE.PENDING]: {
      total: pendings.length,
      appointments: pendings,
    },
    [MY_APPOINTMENTS_LIST_STATE.ACCEPTED]: {
      total: accepted.length,
      appointments: accepted,
    },
    [MY_APPOINTMENTS_LIST_STATE.REJECTED_OR_CANCELED]: {
      total: rejectedOrCanceled.length,
      appointments: rejectedOrCanceled,
    },
  };
};
