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
import { v4 as uuidv4 } from 'uuid';

export const WeekSlots: FC<WeekSlotsProps> = ({ weekSlots, setWeekSlots }) => {
  const { t } = useTranslation("appointments");
  const addSlot = (day: DAY, slot: Slot) => {
    setWeekSlots((prev) => {
      return {
        ...prev,
        [day]: [...prev[day], slot],
      };
    });
  };

  const removeSlot = (day: DAY, slot: Slot) => {
    setWeekSlots((prev: WeekSlotsModel) => {
      return {
        ...prev,
        [day]: prev[day].filter((s: Slot) => s !== slot),
      };
    });
  };

  return (
    <Box sx={weekBoxStyle}>
      {Object.keys(weekSlots).map((day) => (
        <Box sx={dayBoxStyle}>
          <Typography sx={dayLabelStyle}>{t(day)}</Typography>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box sx={slotsBoxStyle}>
            {weekSlots[day as DAY].map((slot) => (
              <DailySlot
                key={uuidv4()}
                slot={slot}
                setSlot={() => console.log("test")}
                handleDelete={() => removeSlot(day as DAY, slot)}
              />
            ))}
            <IconButton
              onClick={() =>
                addSlot(day as DAY, {
                  begin: { hour: "--", minute: "--" },
                  end: { hour: "--", minute: "--" },
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
