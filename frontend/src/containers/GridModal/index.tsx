import { FC, useRef } from "react";

import {
  Alert,
  Box,
  IconButton,
  Modal,
  Typography,
} from "@cgi-learning-hub/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";

import { Button } from "@cgi-learning-hub/ui";
import { CustomStepper } from "~/components/CustomStepper";
import { DialogModal } from "~/components/DialogModal";
import { APPOINTMENTS, GRID_MODAL_VALUES } from "~/core/constants";
import { useGridModal } from "~/providers/GridModalProvider";
import { GRID_MODAL_TYPE } from "~/providers/GridModalProvider/enum";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { FirstPageGridModal } from "../FirstPageGridModal";
import { SecondPageGridModal } from "../SecondPageGridModal";
import {
  bottomButtonBoxStyle,
  closeIconStyle,
  contentBoxStyle,
  instructionStyle,
  modalBoxStyle,
} from "./style";

export const GridModal: FC = () => {
  const { t } = useTranslation(APPOINTMENTS);

  const {
    isDisplayFirstPage,
    isDisplaySecondPage,
    handlePrev,
    handleNext,
    handleSubmit,
    isModalOpen,
    isDialogOpen,
    handleCancel,
    handleConfirmDialog,
    handleCancelDialog,
    page,
    modalType,
    confirmModalType,
    isSubmitButtonLoading,
  } = useGridModal();

  const topModalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (modalType === GRID_MODAL_TYPE.CONSULTATION) handleCancel();
  };

  const handleGoToSecondPage = () => {
    handleNext();
    topModalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToFirstPage = () => {
    handlePrev();
    topModalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Box sx={contentBoxStyle} ref={topModalRef}>
            <Box sx={spaceBetweenBoxStyle}>
              <Typography variant="h2" fontWeight="bold" color="text.primary">
                {t(GRID_MODAL_VALUES[modalType].titleKey)}
              </Typography>
              <IconButton
                disabled={isSubmitButtonLoading}
                sx={closeIconStyle}
                onClick={handleCancel}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            {modalType === GRID_MODAL_TYPE.EDIT && (
              <Alert severity="info">
                <Typography variant="body2">
                  {t("appointments.modify.grid.alert")}
                </Typography>
              </Alert>
            )}
            <Typography sx={instructionStyle}>
              {t(GRID_MODAL_VALUES[modalType].instructionKey)}
            </Typography>
            {isDisplayFirstPage && <FirstPageGridModal />}
            {isDisplaySecondPage && <SecondPageGridModal />}
            {modalType === GRID_MODAL_TYPE.CREATION && (
              <CustomStepper
                page={page}
                isSubmitButtonLoading={isSubmitButtonLoading}
                handleCancel={handleCancel}
                handlePrev={handleGoToFirstPage}
                handleNext={handleGoToSecondPage}
                handleSubmit={handleSubmit}
              />
            )}
            {modalType === GRID_MODAL_TYPE.EDIT && (
              <Box sx={bottomButtonBoxStyle}>
                <Button onClick={handleCancel} variant="text">
                  {t("appointments.cancel")}
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                  {t("appointments.save")}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
      <DialogModal
        open={isDialogOpen}
        type={confirmModalType}
        isSubmitButtonLoading={isSubmitButtonLoading}
        handleCancel={handleCancelDialog}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
};
