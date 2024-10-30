import { flexStartBoxStyle } from "~/styles/boxStyles";
import { PURPLE } from "~/styles/constants";

export const boxDailySlotStyle = {
  ...flexStartBoxStyle,
  boxShadow: "0px 0px 4px 0px #0000001F",
  borderRadius: "0.5rem",
  gap: "1rem",
  padding: "0 1rem",
  margin: "0.5rem 1rem",
  width: "fit-content",
};

export const formControlStyle = {
  height: "3rem",
  margin: "1rem 0",
};

export const selectStyle = {
  borderRadius: "0rem",
  height: "100%",
  padding: "0",
  "&:before": {
    border: "0 !important",
  },
  "&after": {
    border: "0 !important",
  },
  "& .MuiSelect-icon": {
    display: "none",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "0 0.5rem !important",
    height: "100% !important",
  },
  "& .MuiInputBase-root": {
    padding: "0",
    height: "100%",
  }
};

export const boxValueStyle = {
    ...flexStartBoxStyle,
    gap: "0.8rem",
}

export const iconButtonStyle = {
    padding: "0",
}

export const iconStyle = {
    color: PURPLE,
    fontSize: "2rem",
}
