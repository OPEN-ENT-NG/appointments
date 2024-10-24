import { FC, useState } from "react";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { itemStyle, validityPeriodStyle } from "./style";
import { pageGridModalStyle } from "../GridModal/style";
import { RangeDatePicker } from "~/components/RangeDatePicker";
import { WeekSlots } from "~/components/WeekSlots";
import { useGridModalProvider } from "~/providers/GridModalProvider";
import { useUpdateGridInputs } from "~/hooks/useUpdateGriInputs";

export const SecondPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const { inputs, slotDurationOptions, periodicityOptions} =
    useGridModalProvider();

    const {handleSlotDurationChange, handlePeriodicityChange} = useUpdateGridInputs();

  return (
    <Box sx={pageGridModalStyle}>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.validity.period") + " *"}</Typography>
        <RangeDatePicker />
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.slot.duration") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive value={inputs.slotDuration}>
            {slotDurationOptions.map((option) => (
              <ToggleButton
                key={option}
                value={option}
                onClick={handleSlotDurationChange}
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
                onClick={handlePeriodicityChange}
              >
                {t(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.available.slots") + " *"}</Typography>
        <WeekSlots/>
      </Box>
    </Box>
  );
};
