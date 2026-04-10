import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";

import { Box, Button, Tab, Tabs, Typography, useMediaQuery } from "@cgi-learning-hub/ui";
import { ID } from "@edifice.io/client";
import { useSearchParams } from "react-router-dom";

import { AppointmentsIcon } from "~/components/SVG/AppointmentsIcon";
import { FindAppointments } from "~/containers/FindAppointments";
import { MyAppointments } from "~/containers/MyAppointments";
import { MyAvailability } from "~/containers/MyAvailability";
import { useFindAppointments } from "~/providers/FindAppointmentsProvider";
import { useGlobal } from "~/providers/GlobalProvider";
import {
  appointmentsIconStyle,
  contentStyle,
  headerStyle,
  homeStyle,
  tabItemStyle,
  tabsStyle,
  titleStyle,
} from "./style";
import { useTheme } from "~/hooks/useTheme";
import { centerBoxStyle } from "~/styles/boxStyles";
import { ExportAppointmentsModal } from "~/containers/ExportAppointmentsModal";
import { ModalType } from "~/providers/GlobalProvider/enum";
import { t } from "~/i18n";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { shouldDisplayExportButton } from "./utils";

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
  const { hasManageRight, setAppointmentIdFromNotify, toggleModal, displayModals: { showExportModal } } = useGlobal();
  const { resetSearch } = useFindAppointments();
  const { myAppointments, isExportingAppointments, handleExportMultipleAppointments } = useMyAppointments();

  const initialTabValue = parseInt(sessionStorage.getItem("tabValue") || "0");
  const [tabValue, setTabValue] = useState(
    !hasManageRight && initialTabValue === 2 ? 0 : initialTabValue,
  );
  const { isTheme1D } = useTheme();
  const isMobile = useMediaQuery("(max-width:620px)");
  const displayExportButton = shouldDisplayExportButton(myAppointments);

  const handleChange = useCallback(
    (_: SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
      if (tabValue === 0) resetSearch();
      sessionStorage.setItem("tabValue", newValue.toString());
    },
    [resetSearch, tabValue],
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const appointmentId = searchParams.get("appointmentId");
    if (appointmentId) {
      setAppointmentIdFromNotify(parseInt(appointmentId));
      handleChange({} as SyntheticEvent, 1);
      searchParams.delete("appointmentId");
      setSearchParams(searchParams);
    }
  }, [searchParams, setAppointmentIdFromNotify, handleChange, setSearchParams]);

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
            {hasManageRight && <Tab label={t("appointments.my.availability")} />}
          </Tabs>
          <Box sx={{...(isMobile && { ...centerBoxStyle, marginTop: "1rem" })}}>
            {displayExportButton && tabValue === 1 && (
              <Button
                color={"primary"}
                variant={"contained"}
                startIcon={<DownloadRoundedIcon />}
                loading={isExportingAppointments}
                onClick={() => toggleModal(ModalType.EXPORT)}
              >
                {t("appointments.event.export.all.button.title")}
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={tabItemStyle}>
          {tabValue === 0 && <FindAppointments />}
          {tabValue === 1 && <MyAppointments />}
          {tabValue === 2 && hasManageRight && <MyAvailability />}
        </Box>
      </Box>
      <ExportAppointmentsModal
        isOpen={showExportModal}
        handleClose={() => toggleModal(ModalType.EXPORT)}
        handleExport={() => { void handleExportMultipleAppointments() }} />
    </Box>
  );
};
