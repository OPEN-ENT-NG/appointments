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

export const SecondPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const [weekSlots, setWeekSlots] = useState<WeekSlotsModel>({
    [DAY.MONDAY]: [
    ],
    [DAY.TUESDAY]: [
    ],
    [DAY.WEDNESDAY]: [
    ],
    [DAY.THURSDAY]: [
    ],
    [DAY.FRIDAY]: [
    ],
    [DAY.SATURDAY]: [
    ]
  });

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
          <ToggleButtonGroup exclusive value={SLOT_DURATION.FIVETEEN_MINUTES}>
            <ToggleButton value={SLOT_DURATION.FIVETEEN_MINUTES}>
              {SLOT_DURATION.FIVETEEN_MINUTES}
            </ToggleButton>
            <ToggleButton value={SLOT_DURATION.THIRTY_MINUTES}>
              {SLOT_DURATION.THIRTY_MINUTES}
            </ToggleButton>
            <ToggleButton value={SLOT_DURATION.FOURTYFIVE_MINUTES}>
              {SLOT_DURATION.FOURTYFIVE_MINUTES}
            </ToggleButton>
            <ToggleButton value={SLOT_DURATION.ONE_HOUR}>
              {SLOT_DURATION.ONE_HOUR}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.periodicity") + " *"}</Typography>
        <Box sx={validityPeriodStyle}>
          <ToggleButtonGroup exclusive>
            <ToggleButton value={PERIODICITY.WEEKLY}>
              {t(PERIODICITY.WEEKLY)}
            </ToggleButton>
            <ToggleButton value={PERIODICITY.BIWEEKLY}>
              {t(PERIODICITY.BIWEEKLY)}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={itemStyle}>
        <Typography>{t("appointments.grid.available.slots") + " *"}</Typography>
        <WeekSlots weekSlots={weekSlots} setWeekSlots={setWeekSlots} />
      </Box>
    </Box>
  );
};
