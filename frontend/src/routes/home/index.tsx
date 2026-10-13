import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@cgi-learning-hub/ui";
import { ID } from "@edifice.io/client";
import { useSearchParams } from "react-router-dom";

import { AppointmentsIcon } from "~/components/SVG/AppointmentsIcon";
import { SwitchView } from "~/components/SwitchView";
import { IToggleButtonItem } from "~/components/SwitchView/types";
import { FindAppointments } from "~/containers/FindAppointments";
import { MyAppointments } from "~/containers/MyAppointments";
import { MyAvailability } from "~/containers/MyAvailability";
import { BOOK_APPOINTMENT_MODAL_BREAKPOINT } from "~/core/breakpoints";
import { useTheme } from "~/hooks/useTheme";
import { t } from "~/i18n";
import { useFindAppointments } from "~/providers/FindAppointmentsProvider";
import { useGlobal } from "~/providers/GlobalProvider";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { getToggleButtons } from "~/routes/home/utils";
import {
  appointmentsIconStyle,
  contentStyle,
  headerStyle,
  homeStyle,
  tabItemStyle,
  tabsStyle,
  titleStyle,
  toggleStyle,
} from "./style";

export interface AppProps {
  _id: string;
  created: Date;
  description: string;
  map: string;
  modified: Date;
  name: string;
  owner: { userId: ID; displayName: string };
  shared: any[];
  thumbnail: string;
}

export const Home: FC = () => {
  const { hasManageRight, setAppointmentIdFromNotify, setGridIdFromLink } =
    useGlobal();
  const { resetSearch } = useFindAppointments();
  const { viewMode, toggleViewMode, isAllAppointmentsEmpty } =
    useMyAppointments();

  const initialTabValue = parseInt(sessionStorage.getItem("tabValue") || "0");
  const [tabValue, setTabValue] = useState(
    !hasManageRight && initialTabValue === 2 ? 0 : initialTabValue,
  );
  const { isTheme1D } = useTheme();
  const toggleButtonList: IToggleButtonItem[] = getToggleButtons();

  const handleChange = useCallback(
    (_: SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
      if (tabValue === 0) resetSearch();
      sessionStorage.setItem("tabValue", newValue.toString());
    },
    [resetSearch, tabValue],
  );

  const isMobile = useMediaQuery(
    `(max-width: ${BOOK_APPOINTMENT_MODAL_BREAKPOINT}px)`,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const appointmentId = searchParams.get("appointmentId");
    if (appointmentId) {
      setAppointmentIdFromNotify(parseInt(appointmentId));
      handleChange({} as SyntheticEvent, 1);
      searchParams.delete("appointmentId");
      setSearchParams(searchParams);
      return;
    }

    const gridId = searchParams.get("gridId");
    if (gridId) {
      setGridIdFromLink(parseInt(gridId));
      handleChange({} as SyntheticEvent, 0);
      searchParams.delete("gridId");
      setSearchParams(searchParams);
    }
  }, [
    searchParams,
    setAppointmentIdFromNotify,
    setGridIdFromLink,
    handleChange,
    setSearchParams,
  ]);

  return (
    <Box sx={homeStyle}>
      <Box sx={titleStyle}>
        <Box sx={appointmentsIconStyle}>
          <AppointmentsIcon />
        </Box>
        <Typography
          variant="h1"
          color="primary"
          {...(!isTheme1D && { fontFamily: "Comfortaa", fontWeight: "bold" })}
        >
          {t("appointments.title")}
        </Typography>
      </Box>
      <Box sx={contentStyle}>
        <Box sx={headerStyle}>
          <Tabs
            sx={tabsStyle}
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
          >
            <Tab label={t("appointments.find.appointment")} />
            <Tab label={t("appointments.my.appointments")} />
            {hasManageRight && (
              <Tab label={t("appointments.my.availability")} />
            )}
          </Tabs>
          {tabValue === 1 && !isAllAppointmentsEmpty && (
            <Box sx={toggleStyle}>
              {isMobile && (
                <Typography
                  variant="h2"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {t("appointments.my.appointments")}
                </Typography>
              )}
              <SwitchView
                viewMode={viewMode}
                toggleButtonList={toggleButtonList}
                onChange={toggleViewMode}
              />
            </Box>
          )}
        </Box>
        <Box sx={tabItemStyle}>
          {tabValue === 0 && <FindAppointments />}
          {tabValue === 1 && <MyAppointments />}
          {tabValue === 2 && hasManageRight && <MyAvailability />}
        </Box>
      </Box>
    </Box>
  );
};
