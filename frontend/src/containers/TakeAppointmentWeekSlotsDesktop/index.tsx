import { FC } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Checkbox, Typography } from "@mui/material";
import { common } from "@mui/material/colors";
import dayjs from "dayjs";
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
  NoSlots,
  noSlotsStyle,
  visioOptionStyle,
  weekDayStyle,
  weekSlotsWrapperStyle,
} from "./style";

export const TakeAppointmentWeekSlotsDesktop: FC = () => {
  const { t } = useTranslation("appointments");

  const {
    gridInfos,
    currentSlots,
    canGoNext,
    canGoPrev,
    handlePreviousWeek,
    handleNextWeek,
  } = useTakeAppointmentModal();

  const isVisioOptionVisible = !!gridInfos?.visioLink;

  return (
    <Box sx={globalContainerStyle}>
      <Box sx={{ filter: "blur(0)" }}>
        <ArrowButton isVisible={canGoPrev} onClick={handlePreviousWeek}>
          <KeyboardArrowLeftIcon />
        </ArrowButton>
      </Box>
      <Box sx={containerStyle}>
        <Box sx={headerStyle}>
          {currentSlots.map((daySlot) => {
            const isToday = dayjs().locale("fr").isSame(daySlot.day, "day");
            return (
              <ColumnSlotsWrapper
                isEmpty={!!daySlot.slots && !daySlot.slots.length}
                sx={daySlotsHeaderStyle}
                key={uuidv4()}
                isToday={isToday}
              >
                <Typography sx={weekDayStyle}>
                  {t(DAY_VALUES[daySlot.weekDay].i18nKey)}
                </Typography>
                <Typography sx={dayStyle}>
                  {daySlot.day.locale("fr").format("D MMMM")}
                </Typography>
              </ColumnSlotsWrapper>
            );
          })}
        </Box>
        {canGoNext ? (
          <Box sx={weekSlotsWrapperStyle}>
            {currentSlots.map((daySlot) => (
              <ColumnSlotsWrapper
                isEmpty={!!daySlot.slots && !daySlot.slots.length}
                sx={daySlotsWrapperStyle}
                key={uuidv4()}
              >
                <DaySlots
                  key={uuidv4()}
                  slots={daySlot.slots}
                  modalSize={MODAL_SIZE.LARGE}
                  isVisioOptionVisible={isVisioOptionVisible}
                />
              </ColumnSlotsWrapper>
            ))}
          </Box>
        ) : (
          <NoSlots isVisioOptionVisible={isVisioOptionVisible}>
            <Box sx={noSlotsStyle}>
              <Typography
                variant="body2"
                fontStyle={"italic"}
                color={common.black}
              >
                {t("appointments.take.appointment.modal.no.slot")}
              </Typography>
            </Box>
          </NoSlots>
        )}
        {isVisioOptionVisible && (
          <Box sx={flexStartBoxStyle}>
            <Checkbox />
            <Typography sx={visioOptionStyle}>
              {t("appointments.take.appointment.modal.visio.option")}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ filter: "blur(0)" }}>
        <ArrowButton isVisible={canGoNext} onClick={handleNextWeek}>
          <KeyboardArrowRightIcon />
        </ArrowButton>
      </Box>
    </Box>
  );
};
