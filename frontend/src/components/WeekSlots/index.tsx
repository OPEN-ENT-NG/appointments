import { FC } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  dayBoxStyle,
  dayLabelStyle,
  iconStyle,
  slotsBoxStyle,
  weekBoxStyle,
} from "./style";
import { DailySlot } from "../DailySlot";
import { DAY } from "~/core/enums";
import { formatDayToI18n } from "~/core/utils";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const WeekSlots: FC = () => {
  const { t } = useTranslation("appointments");
  const {
    inputs,
    updateGridModalInputs: { handleAddSlot },
  } = useGridModalProvider();

  return (
    <Box sx={weekBoxStyle}>
      {Object.keys(inputs.weekSlots).map((day) => (
        <Box sx={dayBoxStyle} key={day}>
          <Typography sx={dayLabelStyle}>
            {t(formatDayToI18n(DAY[day as keyof typeof DAY]))}
          </Typography>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box sx={slotsBoxStyle}>
            {inputs.weekSlots[day as DAY].map((slot) => (
              <DailySlot key={slot.id} day={day as DAY} slot={slot} />
            ))}
            <IconButton
              onClick={() => handleAddSlot(day as DAY)}
              // disabled={true}
            >
              <AddCircleIcon sx={iconStyle} />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
