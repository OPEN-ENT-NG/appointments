import { FC } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Checkbox, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { DaySlots } from "~/components/DaySlots";
import { DAY_VALUES } from "~/core/constants";
import { useTakeAppointmentModal } from "~/providers/TakeAppointmentModalProvider";
import { flexStartBoxStyle } from "~/styles/boxStyles";
import { MODAL_SIZE } from "../TakeAppointmentModal/enum";
import {
  ArrowButton,
  ColumnSlotsWrapper,
  containerStyle,
  daySlotsHeaderStyle,
  daySlotsWrapperStyle,
  dayStyle,
  globalContainerStyle,
  headerStyle,
  visioOptionStyle,
  weekDayStyle,
  weekSlotsWrapperStyle,
} from "./style";

export const TakeAppointmentWeekSlotsDesktop: FC = () => {
  const { t } = useTranslation("appointments");

  const { currentSlots, handlePreviousWeek, handleNextWeek } =
    useTakeAppointmentModal();
  console.log("currentSlots", currentSlots);
  return (
    <Box sx={globalContainerStyle}>
      <Box sx={{ filter: "blur(0)" }}>
        <ArrowButton isVisible onClick={handlePreviousWeek}>
          <KeyboardArrowLeftIcon />
        </ArrowButton>
      </Box>
      <Box sx={containerStyle}>
        <Box sx={headerStyle}>
          {currentSlots.map((daySlot) => (
            <ColumnSlotsWrapper
              isEmpty={!daySlot.slots?.length}
              sx={daySlotsHeaderStyle}
              key={uuidv4()}
            >
              <Typography sx={weekDayStyle}>
                {t(DAY_VALUES[daySlot.weekDay].i18nKey)}
              </Typography>
              <Typography sx={dayStyle}>
                {daySlot.day.locale("fr").format("D MMMM")}
              </Typography>
            </ColumnSlotsWrapper>
          ))}
        </Box>
        <Box sx={weekSlotsWrapperStyle}>
          {currentSlots.map((daySlot) => (
            <ColumnSlotsWrapper
              isEmpty={!daySlot.slots?.length}
              sx={daySlotsWrapperStyle}
              key={uuidv4()}
            >
              <DaySlots
                key={uuidv4()}
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
      <Box sx={{ filter: "blur(0)" }}>
        <ArrowButton isVisible onClick={handleNextWeek}>
          <KeyboardArrowRightIcon />
        </ArrowButton>
      </Box>
    </Box>
  );
};
