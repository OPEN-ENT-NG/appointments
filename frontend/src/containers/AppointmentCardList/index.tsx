import { FC, useEffect, useRef, useState } from "react";

import { Box, Pagination, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { containerStyle, paginationBoxStyle, wrapperListBox } from "./style";
import { AppointmentCardListProps } from "./types";
import { AppointmentCard } from "~/components/AppointmentCard";
import { MY_APPOINTMENTS_LIST_STATE_VALUES } from "~/core/constants";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";

export const AppointmentCardList: FC<AppointmentCardListProps> = ({
  appointmentsType,
  myAppointments,
}) => {
  const { t } = useTranslation("appointments");
  const { handleChangeLimit, handleChangePage, limits, pages } =
    useMyAppointments();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | undefined>();

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (containerWidth)
      handleChangeLimit(appointmentsType, Math.floor(containerWidth / 250));
  }, [containerWidth]);

  return (
    <Box ref={containerRef} sx={containerStyle}>
      <Typography variant="h3" color="primary" fontWeight="bold">
        {t(MY_APPOINTMENTS_LIST_STATE_VALUES[appointmentsType].i18nTitleKey)}
      </Typography>
      <Box sx={wrapperListBox}>
        {myAppointments.appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </Box>
      <Box sx={paginationBoxStyle}>
        {myAppointments.total > limits[appointmentsType] && (
          <Pagination
            count={Math.ceil(myAppointments.total / limits[appointmentsType])}
            page={pages[appointmentsType]}
            onChange={(_, newPage) =>
              handleChangePage(appointmentsType, newPage)
            }
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            variant="text"
          />
        )}
      </Box>
    </Box>
  );
};
