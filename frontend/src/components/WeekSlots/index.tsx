import { FC } from "react";
import { WeekSlotsProps } from "./types";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { DailySlot } from "../DailySlot";
import { useTranslation } from "react-i18next";
import {
  dayBoxStyle,
  dayLabelStyle,
  iconStyle,
  slotsBoxStyle,
  weekBoxStyle,
} from "./style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DAY } from "~/core/enums";
import { Slot, WeekSlotsModel } from "~/core/types";
import { v4 as uuidv4 } from "uuid";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const WeekSlots: FC =() => {
  const { t } = useTranslation("appointments");
  const { inputs, setInputs } = useGridModalProvider();

  
  const addSlot = (day: DAY, slot: Slot) => {
    setInputs(prev => ({
      ...prev,
      weekSlots: {
        ...prev.weekSlots,
        [day]: [...prev.weekSlots[day], slot],
      },
    }));
  };

  const removeSlot = (day: DAY, slot: Slot) => {
    setInputs(prev => ({
      ...prev,
      weekSlots: {
        ...prev.weekSlots,
        [day]: prev.weekSlots[day].filter((s) => s !== slot),
      },
    }));
  };

  return (
    <Box sx={weekBoxStyle}>
      {Object.keys(inputs.weekSlots).map((day) => (
        <Box sx={dayBoxStyle}>
          <Typography sx={dayLabelStyle}>{t(day)}</Typography>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box sx={slotsBoxStyle}>
            {inputs.weekSlots[day as DAY].map((slot) => (
              <DailySlot
                key={uuidv4()}
                slot={slot}
                handleDelete={() => removeSlot(day as DAY, slot)}
              />
            ))}
            <IconButton
              onClick={() =>
                addSlot(day as DAY, {
                  begin: { hour: null, minute: null },
                  end: { hour: null, minute: null },
                })
              }
            >
              <AddCircleIcon sx={iconStyle} />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
