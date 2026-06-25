import { FC } from "react";
import { Box, Stack, Typography } from "@cgi-learning-hub/ui";
import { CalendarEventProps } from "./types";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { calendarEventStyle, descriptionEventStyle } from "./style";
import { isEventLessThan } from "./utils";
import { MAX_DURATION_SHORT_EVENT } from "~/core/constants";

export const CalendarEvent: FC<CalendarEventProps> = ({ eventInfo }) => {
  const { comment, colors, IconComponent } = eventInfo.event.extendedProps;

  return (
    <Box
      sx={{
        ...calendarEventStyle,
        backgroundColor: colors.background,
        borderLeft: `3px solid ${colors.border}`,
        ...(isEventLessThan(eventInfo, MAX_DURATION_SHORT_EVENT) && {
          padding: 0,
        }),
      }}
    >
      <Stack
        spacing={0.5}
        sx={{
          ...(isEventLessThan(eventInfo, MAX_DURATION_SHORT_EVENT) && {
            height: "100%",
          }),
        }}
      >
        {/* First ligne */}
        <Stack
          direction="row"
          sx={{
            ...spaceBetweenBoxStyle,
            ...(isEventLessThan(eventInfo, MAX_DURATION_SHORT_EVENT) && {
              height: "100%",
            }),
          }}
        >
          {/* Time */}
          <Typography
            variant="body2"
            noWrap
            sx={{ flexShrink: 0, marginRight: 1 }}
          >
            {eventInfo.timeText}
          </Typography>

          {/* Other participant */}
          {isEventLessThan(eventInfo, MAX_DURATION_SHORT_EVENT) && (
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", minWidth: 0 }}
              {...(isEventLessThan(eventInfo, 30) && { noWrap: true })}
            >
              {eventInfo.event.title}
            </Typography>
          )}

          {/* Icone */}
          {IconComponent && (
            <IconComponent
              sx={{
                color: colors.icon,
                width: "1.5rem",
                height: "1.5rem",
                flexShrink: 0,
              }}
            />
          )}
        </Stack>

        {/* Body */}
        {!isEventLessThan(eventInfo, MAX_DURATION_SHORT_EVENT) && (
          <Stack>
            {/* Other participant */}
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              {...(isEventLessThan(eventInfo, 30) && { noWrap: true })}
            >
              {eventInfo.event.title}
            </Typography>

            {/* Details */}
            {!isEventLessThan(eventInfo, 30) && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  ...descriptionEventStyle,
                  WebkitLineClamp: isEventLessThan(eventInfo, 45) ? 1 : 2,
                }}
              >
                {comment}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
