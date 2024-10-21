import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC } from "react";

import { useTranslation } from "react-i18next";
import { pageGridModalStyle } from "../GridModal/style";
import RemoveIcon from "@mui/icons-material/Remove";
import { itemStyle, validityPeriodStyle } from "./style";
import { slotDuration } from "~/core/constants/enums";
import { SecondPageGridModalProps } from "./types";

export const SecondPageGridModal: FC<SecondPageGridModalProps> = ({
  secondPageInputs,
  setSecondPageInputs,
}) => {
  const { t } = useTranslation("appointments");

  return (
    <Box sx={pageGridModalStyle}>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.validity.period") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <DatePicker label={t("appointments.grid.validity.period.start")} />
          <RemoveIcon />
          <DatePicker label={t("appointments.grid.validity.period.end")} />
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.slot.duration") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive>
            <ToggleButton value={slotDuration.FIVETEEN_MINUTES}>
              {slotDuration.FIVETEEN_MINUTES}
            </ToggleButton>
            <ToggleButton value={slotDuration.THIRTY_MINUTES}>
              {slotDuration.THIRTY_MINUTES}
            </ToggleButton>
            <ToggleButton value={slotDuration.FOURTYFIVE_MINUTES}>
              {slotDuration.FOURTYFIVE_MINUTES}
            </ToggleButton>
            <ToggleButton value={slotDuration.ONE_HOUR}>
              {slotDuration.ONE_HOUR}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.slot.duration") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive>
            <ToggleButton value={slotDuration.FIVETEEN_MINUTES}>
              {slotDuration.FIVETEEN_MINUTES}
            </ToggleButton>
            <ToggleButton value={slotDuration.THIRTY_MINUTES}>
              {slotDuration.THIRTY_MINUTES}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};
