import { columnBoxStyle } from "~/styles/boxStyles";

export const pageGridModalStyle = {
  ...columnBoxStyle,
  gap: "2rem",
  height: "100%",
  overflowY: "auto",
};

export const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc( min(62rem, 95%))",
  height: "calc(90vh)",
  background: "white",
  borderRadius: ".2rem",
  padding: "2rem 3rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
