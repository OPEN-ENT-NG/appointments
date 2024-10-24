import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { DailySlotProps } from "./types";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  boxDailySlotStyle,
  boxValueStyle,
  formControlStyle,
  iconButtonStyle,
  iconStyle,
  selectBoxStyle,
  selectStyle,
} from "./style";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const DailySlot: FC<DailySlotProps> = ({ day, slot }) => {
  const { t } = useTranslation("appointments");
  const { setInputs } = useGridModalProvider();

  console.log("DailySlot", slot);

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
          onChange={(e) => handleSlotChange(e.target.value, "begin")}
          sx={selectStyle}
          value={slot.begin.hour + ":" + slot.begin.minute}
          renderValue={(value) => (
            <Box sx={boxValueStyle}>
              <AccessTimeIcon sx={iconStyle} />
              {value}
            </Box>
          )}
        >
          <MenuItem value={"12:00"}>{"12:00"}</MenuItem>
        </Select>
      </FormControl>
      <Typography>{t("appointments.to") + " :"}</Typography>
      <FormControl variant="filled" sx={formControlStyle}>
        <Select
          onChange={(e) => handleSlotChange(e.target.value, "end")}
          sx={selectStyle}
          value={slot.end.hour + ":" + slot.end.minute}
          renderValue={(value) => (
            <Box sx={boxValueStyle}>
              <AccessTimeIcon sx={iconStyle} />
              {value}
            </Box>
          )}
        >
          <MenuItem value={"12:00"}>{"12:00"}</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleDelete} sx={iconButtonStyle}>
        <DeleteIcon sx={iconStyle} />
      </IconButton>
    </Box>
  );
};
