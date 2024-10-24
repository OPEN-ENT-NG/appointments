
import { FC } from "react";


import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  boxDailySlotStyle,
  boxValueStyle,
  formControlStyle,
  iconButtonStyle,
  iconStyle,
  selectStyle,
  timeInputStyle,
} from "./style";
import { DailySlotProps } from "./types";
import { useGridModalProvider } from "~/providers/GridModalProvider";
import { formatTime, getStartOptions } from "./utils";
import { v4 as uuidv4 } from "uuid";

export const DailySlot: FC<DailySlotProps> = ({ day, slot }) => {
  const { t } = useTranslation("appointments");
  const {inputs:{weekSlots}, setInputs } = useGridModalProvider();

  const handleDelete = () => {
    setInputs((prev) => ({
      ...prev,
      weekSlots: {
        ...prev.weekSlots,
        [day]: prev.weekSlots[day].filter((s) => s.id !== slot.id),
      },
    }));
  };

  const handleSlotChange = (value: string, type: "begin" | "end") => {
    const [hour, minute] = value.split(":");
    setInputs((prev) => ({
      ...prev,
      weekSlots: {
        ...prev.weekSlots,
        [day]: prev.weekSlots[day].map((s) =>
          s.id === slot.id
            ? {
                ...s,
                [type]: { hour: parseInt(hour), minute: parseInt(minute) },
              }
            : s,
        ),
      },
    }));
  };

  return (
    <Box sx={boxDailySlotStyle}>
      <Typography>{t("appointments.from") + " :"}</Typography>
      <FormControl variant="filled" sx={formControlStyle}>
        <Select
          onChange={(e) => handleSlotChange(e.target.value as string, "begin")}
          sx={selectStyle}
          value={formatTime(slot.begin)}
          renderValue={(value:String) => (
            <Box sx={boxValueStyle}>
              <AccessTimeIcon sx={iconStyle} />
              <Typography sx={timeInputStyle}>
                {value}
              </Typography>
            </Box>
          )}
        >
          {/* <MenuItem value="--:--">--:--</MenuItem> */}
          {getStartOptions(day, weekSlots).map((time) => (
            <MenuItem key={uuidv4()} value={formatTime(time)}>
              {formatTime(time)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>{t("appointments.to") + " :"}</Typography>
      <FormControl variant="filled" sx={formControlStyle}>
        <Select
          onChange={(e) => handleSlotChange(e.target.value as string, "end")}
          sx={selectStyle}
          value={formatTime(slot.end)}
          renderValue={(value) => (
            <Box sx={boxValueStyle}>
              <AccessTimeIcon sx={iconStyle} />
              <Typography sx={timeInputStyle}>
                {value}
              </Typography>
            </Box>
          )}
        >
          {/* <MenuItem value="--:--">--:--</MenuItem> */}
          {getStartOptions(day, weekSlots).map((time) => (
            <MenuItem key={uuidv4()} value={formatTime(time)}>
              {formatTime(time)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={handleDelete} sx={iconButtonStyle}>
        <DeleteIcon sx={iconStyle} />
      </IconButton>
    </Box>
  );
};
