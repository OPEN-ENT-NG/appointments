import { Stack } from "@cgi-learning-hub/ui";
import { styled } from "@mui/material";
import { StyledHeaderProps } from "./types";

export const calendarContainerStyle = {
  marginTop: 4,
  gap: "1rem",

  // Enlève design natif du header pour laisser place à notre custom
  "& .fc-col-header-cell": {
    padding: "0 !important",
    border: "none !important",
  },
  "& .fc-col-header-cell-cushion": {
    padding: "0 !important",
    width: "100%",
    display: "block",
  },
  "& .fc-col-header": {
    border: "none !important",
  },
  "& .fc-scrollgrid-section-header > td": {
    border: "none !important",
  },
  "& .fc-scrollgrid": {
    border: "none !important",
  },

  // Cache la scrollbar à droite du header
  "& .fc-scrollgrid-section-header .fc-scroller": {
    overflow: "hidden !important",
  },

  // Cache la cellule du header à gauche
  "& .fc-scrollgrid-section-header .fc-timegrid-axis": {
    border: "none !important",
  },

  // Cache la bordure du header à droite
  "& th": {
    border: "none !important",
  },

  // Lignes de slots mineurs (les pointillés toutes les 10min)
  "& .fc-timegrid-slot-minor": {
    border: "none !important",
  },

  // Couleur des lignes majeures (chaque heure)
  "& .fc-timegrid-slot ": {
    borderColor: `var(--theme-palette-grey-light) !important`,
  },

  // Couleur des lignes entre les colonnes jours
  "& .fc-timegrid-col ": {
    borderColor: `var(--theme-palette-grey-light) !important`,
  },

  // Bordure tout à gauche
  "tr > td:first-of-type": {
    borderLeft: `1px solid var(--theme-palette-grey-light) !important`,
  },

  // Bordure tout à droite
  "tr > td:last-of-type": {
    borderRight: `1px solid var(--theme-palette-grey-light) !important`,
  },

  // Ligne entre le header et la grid
  "tr:first-of-type > td": {
    borderTop: `1px solid var(--theme-palette-grey-light) !important`,
  },

  // Couleur du background du jour en cours
  "& .fc-timegrid-col.fc-day-today": {
    backgroundColor: `var(--theme-palette-grey-lighter) !important`,
  },

  // Override le style du nowIndicator
  "& .fc-timegrid-now-indicator-arrow": {
    border: "none",
    transform: "translateY(-50%)", // centre verticalement avec la ligne
    display: "flex",
    justifyContent: "center", // centre horizontalement dans la colonne
    width: "100%",
    padding: 0,
    margin: 0,
    // create little bar at the start or the nowIndicator line
    "-webkit-box-shadow": "9px 0 0 -8px var(--theme-palette-primary-main)",
    "-moz-box-shadow": "9px 0 0 -8px var(--theme-palette-primary-main)",
    "box-shadow": "9px 0 0 -8px var(--theme-palette-primary-main)",
  },

  // Autorise le display de la barre du nowIndicator sur toute la longueur
  "& .fc-timegrid-now-indicator-container": {
    overflow: "visible !important",
  },
};

export const StyledHeader = styled(Stack)<StyledHeaderProps>(
  ({ isMobile }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isMobile ? "space-between" : "flex-end",
    gap: 1,
    marginBottom: 1,
  }),
);

export const headerCellStyle = {
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "grey.light",
  borderRadius: "8px",
  padding: "8px",
  marginX: "4px",
  marginBottom: "8px",
};

export const headerCellHyphenStyle = {
  backgroundColor: "primary.main",
  width: "6%",
  height: "1.5px",
  marginTop: "-1.5px",
};

export const headerCellDateStyle = {
  flexDirection: "column",
  marginTop: "1.5px",
};

export const nowIndicatorStyle = {
  position: "absolute",
  right: 0,
  top: "-1px",
  height: "1px",
  width: "100vw",
  backgroundColor: "primary.main",
  zIndex: 5,
};
