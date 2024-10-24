import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";

import { useTranslation } from "react-i18next";
import { pageGridModalStyle } from "../GridModal/style";
import RemoveIcon from "@mui/icons-material/Remove";
import { itemStyle, validityPeriodStyle } from "./style";
import { DAY, PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { WeekSlots } from "~/components/WeekSlots";
import { WeekSlotsModel } from "~/core/types";
import { useGridModalProvider } from "~/providers/GridModalProvider";
import { Dayjs } from "dayjs";

export const SecondPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const { inputs, setInputs, slotDurationOptions, periodicityOptions } =
    useGridModalProvider();


  const handleStartChange = (date: Dayjs | null) => {
    setInputs({
      ...inputs,
      validityPeriod: { ...inputs.validityPeriod, start: date },
    });
  };

  const handleEndChange = (date: Dayjs | null) => {
    setInputs({
      ...inputs,
      validityPeriod: { ...inputs.validityPeriod, end: date },
    });
  };

  const handleSlotDurationChange = (value: SLOT_DURATION) => {
    setInputs({ ...inputs, slotDuration: value });
  };

  const handlePeriodicityChange = (value: PERIODICITY) => {
    setInputs({ ...inputs, periodicity: value });
  };

  const handleWeekSlotsChange = (value: WeekSlotsModel) => {
    setInputs({ ...inputs, weekSlots: value });
  }

  return (
    <Box sx={pageGridModalStyle}>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.validity.period") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <DatePicker
            label={t("appointments.grid.validity.period.start")}
            value={inputs.validityPeriod.start}
            onChange={handleStartChange}
          />
          <RemoveIcon />
          <DatePicker
            label={t("appointments.grid.validity.period.end")}
            value={inputs.validityPeriod.end}
            onChange={handleEndChange}
          />
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.slot.duration") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive value={inputs.slotDuration}>
            {slotDurationOptions.map((option) => (
              <ToggleButton
                key={option}
                value={option}
                onClick={() => handleSlotDurationChange(option)}
              >
                {t(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.periodicity") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive value={inputs.periodicity}>
            {periodicityOptions.map((option) => (
              <ToggleButton
                key={option}
                value={option}
                onClick={() => handlePeriodicityChange(option)}
              >
                {t(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.available.slots") + " *"}</Typography>
        <WeekSlots weekSlots={inputs.weekSlots} handleWeekSlotsChange={handleWeekSlotsChange} />
      </Box>
    </Box>
  );
};
