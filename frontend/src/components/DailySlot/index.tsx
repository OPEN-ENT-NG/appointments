import { Box, FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";

import { DailySlotProps } from "./types";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { boxDailySlotStyle, boxValueStyle, formControlStyle, iconButtonStyle, iconStyle, selectBoxStyle, selectStyle } from "./style";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';

export const DailySlot: FC<DailySlotProps> = ({ slot, setSlot, handleDelete }) => {
  const { t } = useTranslation("appointments");
  return (
    <Box sx={boxDailySlotStyle}>
      <Typography>{t("appointments.from") + " :"}</Typography>
        <FormControl variant="filled" sx={formControlStyle}>
          <Select
            onChange={(e) => console.log(e)}
            sx={selectStyle}
            value={slot.begin.hour + ":" + slot.begin.minute}
            renderValue={(value) => (
              <Box sx={boxValueStyle}>
                <AccessTimeIcon sx={iconStyle} />
                {value}
              </Box>
            )}
          >
            <MenuItem value={"12:00"}>12:20</MenuItem>
          </Select>
        </FormControl>
        <Typography>{t("appointments.to") + " :"}</Typography>
        <FormControl variant="filled" sx={formControlStyle}>
          <Select
            onChange={(e) => console.log(e)}
            sx={selectStyle}
            value={slot.end.hour + ":" + slot.end.minute}
            renderValue={(value) => (
              <Box sx={boxValueStyle}>
                <AccessTimeIcon sx={iconStyle} /> {/* L'icône est placée ici à gauche */}
                {value}
              </Box>
            )}
          >
            <MenuItem value={"12:00"}>12:20</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={handleDelete} sx={iconButtonStyle}>
          <DeleteIcon sx={iconStyle} />
        </IconButton>
    </Box>
  );
};
