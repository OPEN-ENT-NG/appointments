import { FC } from "react";
import { CalendarNowIndicatorProps } from "./types";
import { Box, Chip } from "@cgi-learning-hub/ui";
import { nowIndicatorStyle } from "./style";

export const CalendarNowIndicator: FC<CalendarNowIndicatorProps> = ({
  nowIndicator,
  isMobile,
}) => {
  // Display the chip with current time in first column
  if (nowIndicator.isAxis) {
    return (
      <Chip
        color="primary"
        size="small"
        label={nowIndicator.date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        sx={{ fontSize: "1rem" }}
      />
    );
  }

  // Display fine line over all the grid
  const colEl = document.querySelector(".fc-col-header-cell") as HTMLElement;
  const colWidth = colEl?.clientWidth ?? 0;
  return (
    <Box
      sx={{
        ...nowIndicatorStyle,
        left: isMobile
          ? 0
          : `-${(nowIndicator.date.getDay() - 1) * colWidth}px`,
      }}
    />
  );
};
