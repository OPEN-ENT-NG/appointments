import { FC } from "react";

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
import { formatPeriodicityToI18n } from "~/core/utils";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const SecondPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const {
    inputs,
    slotDurationOptions,
    periodicityOptions,
    updateGridModalInputs: {
      handleSlotDurationChange,
      handlePeriodicityChange,
    },
  } = useGridModalProvider();

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
                {t(formatPeriodicityToI18n(option))}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.available.slots") + " *"}</Typography>
        <WeekSlots />
      </Box>
    </Box>
  );
};
