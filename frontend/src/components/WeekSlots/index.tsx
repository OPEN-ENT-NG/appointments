import { FC, useMemo } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Divider,
  FormHelperText,
  IconButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  dayBoxStyle,
  dayLabelStyle,
  errorStyle,
  iconStyle,
  slotsBoxStyle,
  weekBoxStyle,
} from "./style";
import { DailySlot } from "../DailySlot";
import { DAY_VALUES } from "~/core/constants";
import { DAY } from "~/core/enums";
import { useGridModal } from "~/providers/GridModalProvider";

export const WeekSlots: FC = () => {
  const { t } = useTranslation("appointments");
  const {
    inputs,
    errorInputs: { slots },
    updateGridModalInputs: { handleAddSlot },
  } = useGridModal();

  const dayErrors = useMemo(() => {
    const errors: Record<DAY, boolean> = {} as Record<DAY, boolean>;
    Object.entries(inputs.weekSlots).map(([day, timeSlots]) => {
      errors[day as DAY] = timeSlots.some(
        (slot) =>
          slots.ids.includes(slot.id) && (!slot.begin.time || !slot.end.time),
      );
    });
    return errors;
  }, [inputs.weekSlots, slots]);

  return (
    <Box sx={weekBoxStyle}>
      {Object.entries(inputs.weekSlots).map(([day, timeSlots]) => {
        return (
          <>
            <Box sx={dayBoxStyle} key={day}>
              <Typography sx={dayLabelStyle}>
                {t(DAY_VALUES[day as DAY].i18nKey)}
              </Typography>
              <Divider flexItem variant="middle" orientation="vertical" />
              <Box>
                <Box sx={slotsBoxStyle}>
                  {timeSlots.map((slot) => (
                    <DailySlot key={slot.id} day={day as DAY} slot={slot} />
                  ))}
                  <IconButton onClick={() => handleAddSlot(day as DAY)}>
                    <AddCircleIcon sx={iconStyle} />
                  </IconButton>
                </Box>
                {dayErrors[day as DAY] && (
                  <FormHelperText sx={errorStyle} error>
                    {t(slots.error)}
                  </FormHelperText>
                )}
              </Box>
            </Box>
          </>
        );
      })}
    </Box>
  );
};
