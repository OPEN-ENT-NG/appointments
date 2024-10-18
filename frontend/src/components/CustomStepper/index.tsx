import { FC } from "react";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Button, MobileStepper } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  backButtonStyle,
  nextButtonStyle,
  saveButtonStyle,
  stepperStyle,
} from "./style";
import { CustomStepperProps } from "./types";
import { PAGE_TYPE } from "~/containers/GridModal/enum";

export const CustomStepper: FC<CustomStepperProps> = ({
  page,
  setPage,
  handleCancel,
  handleSave,
}) => {
  const { t } = useTranslation("appointments");

  return (
    <MobileStepper
      variant="dots"
      steps={2}
      position="static"
      activeStep={page}
      sx={stepperStyle}
      backButton={
        page === PAGE_TYPE.FIRST ? (
          <Button onClick={handleCancel} sx={backButtonStyle}>
            {t("appointments.cancel")}
          </Button>
        ) : (
          <Button
            onClick={() => setPage(PAGE_TYPE.FIRST)}
            startIcon={<KeyboardArrowLeft />}
            sx={backButtonStyle}
          >
            {t("appointments.back")}
          </Button>
        )
      }
      nextButton={
        page === PAGE_TYPE.FIRST ? (
          <Button
            onClick={() => setPage(PAGE_TYPE.SECOND)}
            sx={nextButtonStyle}
          >
            {t("appointments.next")}
          </Button>
        ) : (
          <Button onClick={handleSave} sx={saveButtonStyle}>
            {t("appointments.save")}
          </Button>
        )
      }
    />
  );
};
