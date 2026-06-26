import { FC } from "react";
import { CalendarSlotLabelProps } from "./types";
import { Typography } from "@cgi-learning-hub/ui";

export const CalendarSlotLabel: FC<CalendarSlotLabelProps> = ({ slot }) => {
  return (
    <Typography variant="caption" color="textSecondary" sx={{ paddingX: 2 }}>
      {slot.date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Typography>
  );
};
