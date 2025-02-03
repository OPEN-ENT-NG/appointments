import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CustomStepper } from "~/components/CustomStepper";
import { DialogModal } from "~/components/DialogModal";
import { GRID_MODAL_VALUES } from "~/core/constants";
import { CONFIRM_MODAL_TYPE } from "~/core/enums";
import { useGridModal } from "~/providers/GridModalProvider";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { FirstPageGridModal } from "../FirstPageGridModal";
import { SecondPageGridModal } from "../SecondPageGridModal";
import {
  closeIconStyle,
  contentBoxStyle,
  instructionStyle,
  modalBoxStyle,
} from "./style";

export const GridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const {
    isDisplayFirstPage,
    isDisplaySecondPage,
    handlePrev,
    handleNext,
    handleSubmit,
    isModalOpen,
    isDialogOpen,
    handleCancel,
    handleClose,
    handleConfirmDialog,
    handleCancelDialog,
    page,
    modalType,
  } = useGridModal();

  return (
    <>
      <Modal open={isModalOpen}>
        <Box sx={modalBoxStyle}>
          <Box sx={contentBoxStyle}>
            <Box sx={spaceBetweenBoxStyle}>
              <Typography variant="h3">
                {t(GRID_MODAL_VALUES[modalType].titleKey)}
              </Typography>
              <IconButton sx={closeIconStyle} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography sx={instructionStyle}>
              {t(GRID_MODAL_VALUES[modalType].instructionKey)}
            </Typography>
            {isDisplayFirstPage && <FirstPageGridModal />}
            {isDisplaySecondPage && <SecondPageGridModal />}
            <CustomStepper
              page={page}
              handleCancel={handleCancel}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Modal>
      <DialogModal
        open={isDialogOpen}
        type={CONFIRM_MODAL_TYPE.CANCEL_GRID_CREATION}
        handleCancel={handleCancelDialog}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
};
