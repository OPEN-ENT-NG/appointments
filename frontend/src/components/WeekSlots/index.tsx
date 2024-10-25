import { FC } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import {
  dayBoxStyle,
  dayLabelStyle,
  iconStyle,
  slotsBoxStyle,
  weekBoxStyle,
} from "./style";
import { DailySlot } from "../DailySlot";
import { DAY } from "~/core/enums";
import { Slot } from "~/core/types";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const WeekSlots: FC = () => {
  const { t } = useTranslation("appointments");
  const { inputs, updateGridModalInputs:{updateInputField} } = useGridModalProvider();

  const addSlot = (day: DAY, slot: Slot) => {
    updateInputField("weekSlots", {
      ...inputs.weekSlots,
      [day]: [...inputs.weekSlots[day], slot],
    });
  };

  return (
    <Box sx={weekBoxStyle}>
      {Object.keys(inputs.weekSlots).map((day) => (
        <Box sx={dayBoxStyle} key={day}>
          <Typography sx={dayLabelStyle}>{t(day)}</Typography>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box sx={slotsBoxStyle}>
            {inputs.weekSlots[day as DAY].map((slot) => (
              <DailySlot
                key={slot.id}
                day={day as DAY}
                slot={slot}
              />
            ))}
            <IconButton
              onClick={() =>
                addSlot(day as DAY, {
                  id: uuidv4(),
                  begin: null,
                  end: null,
                })
              }
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
