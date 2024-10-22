import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

import { DailySlotProps } from "./types";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { boxDailySlotStyle } from "./style";

export const DailySlot: FC<DailySlotProps> = ({ dailySlot, handleDelete }) => {
  const { t } = useTranslation("appointments");
  return (
    <Box sx={boxDailySlotStyle}>
      <Typography>{t("appointments.from") + " :"}</Typography>
      <Select value={dailySlot.begin.hour} onChange={(e) => console.log(e)}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
      </Select>
    </Box>
  );
};
