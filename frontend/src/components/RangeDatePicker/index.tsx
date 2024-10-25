import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { FC, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { boxStyle } from "./style";
import { useGridModalProvider } from "~/providers/GridModalProvider";
import { useTranslation } from "react-i18next";
import { useUpdateGridInputs } from "~/hooks/useUpdateGriInputs";

export const RangeDatePicker: FC = () => {
    const { t } = useTranslation("appointments");

    const {inputs} = useGridModalProvider();
    const { handleStartDateChange, handleEndDateChange } = useUpdateGridInputs();

    const startDate = inputs.validityPeriod.start;

  const MONDAY = 1;
  const SATURDAY = 6;

  const shouldDisableStartDate = (date: Dayjs) => {
    return date.day() !== MONDAY;
  };

  const shouldDisableEndDate = (date: Dayjs) => {
    return date.day() !== SATURDAY;
  };

  return (
    <Box sx={boxStyle}>
      <DatePicker
        label={t("appointments.grid.validity.period.start")}
        value={inputs.validityPeriod.start}
        onChange={handleStartDateChange}
        shouldDisableDate={shouldDisableStartDate}
      />
      <RemoveIcon />
      <DatePicker
        label={t("appointments.grid.validity.period.end")}
        value={inputs.validityPeriod.end}
        onChange={handleEndDateChange}
        minDate={startDate}
        shouldDisableDate={shouldDisableEndDate}
      />
    </Box>
  );
};
