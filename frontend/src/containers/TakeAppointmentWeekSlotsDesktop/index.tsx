import { FC } from "react";

// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Checkbox, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  ColumnSlotsWrapper,
  containerStyle,
  daySlotsHeaderStyle,
  daySlotsWrapperStyle,
  dayStyle,
  visioOptionStyle,
  weekDayStyle,
  weekSlotsWrapperStyle,
} from "./style";
import { MODAL_SIZE } from "../TakeAppointmentModal/enum";
import { DaySlots } from "~/components/DaySlots";
import { useTakeAppointmentModalProvider } from "~/providers/TakeAppointmentModalProvider";
import { flexStartBoxStyle } from "~/styles/boxStyles";

export const TakeAppointmentWeekSlotsDesktop: FC = () => {
  const { t } = useTranslation("appointments");

  const { gridSlots } = useTakeAppointmentModalProvider();
  return (
    <Box sx={containerStyle}>
      <Box sx={weekSlotsWrapperStyle}>
        {gridSlots.map((daySlot, index) => (
          <ColumnSlotsWrapper
            isEmpty={!daySlot.slots.length}
            sx={daySlotsHeaderStyle}
            key={index}
          >
            <Typography sx={weekDayStyle}>
              {t(`appointments.${daySlot.weekDay.toLowerCase()}`)}
            </Typography>
            <Typography sx={dayStyle}>
              {daySlot.day.locale("fr").format("D MMMM")}
            </Typography>
          </ColumnSlotsWrapper>
        ))}
      </Box>
      <Box sx={weekSlotsWrapperStyle}>
        {gridSlots.map((daySlot, index) => (
          <ColumnSlotsWrapper
            isEmpty={!daySlot.slots.length}
            sx={daySlotsWrapperStyle}
          >
            <DaySlots
              key={index}
              slots={daySlot.slots}
              modalSize={MODAL_SIZE.LARGE}
            />
          </ColumnSlotsWrapper>
        ))}
      </Box>
      <Box sx={flexStartBoxStyle}>
        <Checkbox />
        <Typography sx={visioOptionStyle}>
          {t("appointments.take.appointment.modal.visio.option")}
        </Typography>
      </Box>
    </Box>
  );
};
