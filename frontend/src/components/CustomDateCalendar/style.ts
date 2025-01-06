import { styled } from "@mui/material";

export const StyledDay = styled("div")<{ selected: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected ? theme.palette.primary.main : "transparent",
    color: selected ? theme.palette.primary.contrastText : "inherit",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
    },
  }),
);
