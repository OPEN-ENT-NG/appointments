import { FC } from "react";
import { CalendarDayHeaderProps } from "./types";
import { Divider, Stack, Typography } from "@cgi-learning-hub/ui";
import { getDayName, getDayNumberAndMonthName } from "~/core/utils";
import {
  headerCellDateStyle,
  headerCellHyphenStyle,
  headerCellStyle,
} from "./style";

export const CalendarDayHeader: FC<CalendarDayHeaderProps> = ({
  arg,
  locale,
}) => {
  const isCurrentDay = arg.date.toDateString() === new Date().toDateString();
  return (
    <Stack sx={headerCellStyle}>
      {isCurrentDay && <Divider sx={headerCellHyphenStyle} />}
      <Stack sx={headerCellDateStyle}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: isCurrentDay ? "bold" : "normal",
            color: isCurrentDay ? "primary.main" : "text.secondary",
          }}
        >
          {getDayName(arg.date, locale.code)}
        </Typography>
        <Typography
          sx={{
            fontWeight: isCurrentDay ? "bold" : "normal",
            color: isCurrentDay ? "primary.main" : "text.secondary",
          }}
        >
          {getDayNumberAndMonthName(arg.date, locale.code)}
        </Typography>
      </Stack>
    </Stack>
  );
};
