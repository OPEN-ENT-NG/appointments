// WeekCalendar.jsx
// Dépendances à installer :
//   npm install @fullcalendar/react @fullcalendar/core @fullcalendar/timegrid @fullcalendar/daygrid @fullcalendar/interaction
//   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

import { FC, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import { Box } from "@cgi-learning-hub/ui";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// ─── Palette de couleurs par type ───────────────────────────────────────────
const EVENT_COLORS = {
  confirmed: { bg: "#e8f5e9", border: "#66bb6a", text: "#2e7d32" },
  pending:   { bg: "#fff8e1", border: "#ffca28", text: "#f57f17" },
  cancelled: { bg: "#fce4ec", border: "#ef9a9a", text: "#c62828" },
  info:      { bg: "#e3f2fd", border: "#64b5f6", text: "#1565c0" },
  purple:    { bg: "#f3e5f5", border: "#ce93d8", text: "#6a1b9a" },
};

// ─── Données fictives ────────────────────────────────────────────────────────
const today = new Date();
const d = (dayOffset, h, m) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - dt.getDay() + 1 + dayOffset); // lundi = 0
  dt.setHours(h, m, 0, 0);
  return dt.toISOString();
};

const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Jesper Vachon",
    start: d(0, 10, 0), end: d(0, 11, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "Suivi mensuel client", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "2",
    title: "Jesper Vachon",
    start: d(0, 11, 30), end: d(0, 12, 0),
    extendedProps: { type: "info", label: "Consultation", note: "Premier contact", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "3",
    title: "Marie Dupont",
    start: d(1, 10, 0), end: d(1, 11, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "Bilan annuel", phone: "+33 7 98 76 54 32" },
  },
  {
    id: "4",
    title: "Marie Dupont",
    start: d(1, 11, 0), end: d(1, 11, 30),
    extendedProps: { type: "purple", label: "Appel de suivi", note: "Vérification post-opératoire", phone: "+33 7 98 76 54 32" },
  },
  {
    id: "5",
    title: "Marie Dupont",
    start: d(1, 11, 30), end: d(1, 12, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 7 98 76 54 32" },
  },
  {
    id: "6",
    title: "Thomas Leblanc",
    start: d(2, 10, 30), end: d(2, 10, 35),
    extendedProps: { type: "pending", label: "En attente de confirmation", note: "À recontacter", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "7",
    title: "Thomas Leblanc",
    start: d(2, 10, 35), end: d(2, 10, 40),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "56",
    title: "Thomas Leblanc",
    start: d(2, 10, 40), end: d(2, 10, 45),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "57",
    title: "Thomas Leblanc",
    start: d(2, 10, 45), end: d(2, 10, 50),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "58",
    title: "Thomas Leblanc",
    start: d(2, 10, 50), end: d(2, 10, 55),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "59",
    title: "Thomas Leblanc",
    start: d(2, 10, 55), end: d(2, 11, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 55 44 33 22" },
  },
  {
    id: "8",
    title: "Jesper Vachon",
    start: d(3, 10, 0), end: d(3, 10, 15),
    extendedProps: { type: "confirmed", label: "Rendez-vous express", note: "Rapide mise au point", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "9",
    title: "Jesper Vachon",
    start: d(3, 11, 30), end: d(3, 12, 0),
    extendedProps: { type: "info", label: "Consultation", note: "", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "10",
    title: "Jesper Vachon",
    start: d(4, 10, 0), end: d(4, 11, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "Renouvellement contrat", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "11",
    title: "Sophie Martin",
    start: d(4, 11, 30), end: d(4, 12, 0),
    extendedProps: { type: "cancelled", label: "Annulé", note: "Client indisponible", phone: "+33 6 11 22 33 44" },
  },
  {
    id: "12",
    title: "Jesper Vachon",
    start: d(5, 10, 0), end: d(5, 11, 0),
    extendedProps: { type: "confirmed", label: "Rendez-vous ponctuel", note: "", phone: "+33 6 12 34 56 78" },
  },
  {
    id: "13",
    title: "Jesper Vachon",
    start: d(5, 11, 30), end: d(5, 12, 0),
    extendedProps: { type: "purple", label: "Appel de suivi", note: "Récap semaine", phone: "+33 6 12 34 56 78" },
  },
];

// ─── Rendu custom du créneau ─────────────────────────────────────────────────
function EventContent({ eventInfo }) {
  const { type, label } = eventInfo.event.extendedProps;
  const colors = EVENT_COLORS[type] || EVENT_COLORS.confirmed;
  const isConfirmed = type === "confirmed";
  const isCancelled = type === "cancelled";

  return (
    <Box
      sx={{
        height: "100%",
        px: 0.75,
        py: 0.4,
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": { filter: "brightness(0.95)" },
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, fontSize: "0.7rem", color: colors.text, display: "block", lineHeight: 1.3 }}
      >
        {eventInfo.timeText}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, fontSize: "0.72rem", color: colors.text, display: "block", lineHeight: 1.3 }}
        noWrap
      >
        {eventInfo.event.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 0.2 }}>
        <Typography
          variant="caption"
          sx={{ fontSize: "0.65rem", color: colors.text, opacity: 0.8, flexGrow: 1 }}
          noWrap
        >
          {label}
        </Typography>
        {isConfirmed && <CheckCircleIcon sx={{ fontSize: 12, color: "#4caf50" }} />}
        {isCancelled && <CancelIcon sx={{ fontSize: 12, color: "#f44336" }} />}
      </Box>
    </Box>
  );
}

// ─── Modale de détail ────────────────────────────────────────────────────────
function EventModal({ event, onClose }) {
  if (!event) return null;
  const { type, label, note, phone } = event.extendedProps;
  const colors = EVENT_COLORS[type] || EVENT_COLORS.confirmed;

  const statusLabel = {
    confirmed: "Confirmé",
    pending:   "En attente",
    cancelled: "Annulé",
    info:      "Information",
    purple:    "Suivi",
  }[type] || type;

  const start = new Date(event.start);
  const end = new Date(event.end);
  const fmt = (d) =>
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      {/* Bandeau couleur en haut */}
      <Box sx={{ height: 6, bgcolor: colors.border, borderRadius: "12px 12px 0 0" }} />

      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: colors.bg, color: colors.text, width: 40, height: 40, fontWeight: 700 }}>
            {event.title.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {event.title}
            </Typography>
            <Chip
              label={statusLabel}
              size="small"
              sx={{ bgcolor: colors.bg, color: colors.text, fontWeight: 600, fontSize: "0.7rem", height: 20, mt: 0.3 }}
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 12, right: 12 }} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <AccessTimeIcon sx={{ color: "text.secondary", fontSize: 20, mt: 0.2 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {fmt(start)} – {fmt(end)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {fmtDate(start)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EventNoteIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Typography variant="body2">{label}</Typography>
          </Box>

          {phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PersonIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2">{phone}</Typography>
            </Box>
          )}

          {note && (
            <Box
              sx={{
                mt: 0.5,
                p: 1.5,
                bgcolor: "grey.50",
                borderRadius: 2,
                borderLeft: `3px solid ${colors.border}`,
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: "block", mb: 0.3 }}>
                Note
              </Typography>
              <Typography variant="body2">{note}</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" size="small" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="contained" size="small" disableElevation>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
function WeekCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
  };

  return (
    <Box sx={{ p: 3, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Import de la font + styles FullCalendar override */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .fc { font-family: 'DM Sans', sans-serif !important; }
        .fc-col-header-cell { background: #f8f9fb; }
        .fc-col-header-cell-cushion {
          font-size: 0.8rem;
          font-weight: 600;
          color: #555;
          text-decoration: none !important;
          padding: 8px 4px;
        }
        .fc-timegrid-slot { height: 32px !important; }
        .fc-timegrid-slot-label { font-size: 0.72rem; color: #999; }
        .fc-event { border-radius: 6px !important; border-width: 1.5px !important; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .fc-event:hover { box-shadow: 0 3px 8px rgba(0,0,0,0.15) !important; transform: translateY(-1px); transition: all 0.15s ease; }
        .fc-toolbar-title { font-size: 1.1rem !important; font-weight: 700 !important; }
        .fc-button { border-radius: 8px !important; font-family: 'DM Sans', sans-serif !important; font-size: 0.8rem !important; }
        .fc-button-primary { background-color: #5c6bc0 !important; border-color: #5c6bc0 !important; }
        .fc-button-primary:hover { background-color: #3949ab !important; border-color: #3949ab !important; }
        .fc-today-button { background-color: #fff !important; border-color: #ddd !important; color: #333 !important; }
        .fc-today-button:hover { background-color: #f5f5f5 !important; }
        .fc-daygrid-day.fc-day-today, .fc-timegrid-col.fc-day-today { background: #f0f4ff !important; }
        .fc-scrollgrid { border-radius: 12px; overflow: hidden; }
      `}</style>

      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={frLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        events={SAMPLE_EVENTS}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        eventClassNames={(arg) => [`event-type-${arg.event.extendedProps.type}`]}
        eventDidMount={(info) => {
          const { type } = info.event.extendedProps;
          const colors = EVENT_COLORS[type] || EVENT_COLORS.confirmed;
          info.el.style.backgroundColor = colors.bg;
          info.el.style.borderColor = colors.border;
        }}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        slotDuration="00:15:00"
        slotLabelInterval="01:00:00"
        allDaySlot={false}
        nowIndicator
        height="auto"
        weekends={false}
      />

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </Box>
  );
}

export const MyAppointmentsGridPOC: FC = () => {

  return <WeekCalendar />;
};