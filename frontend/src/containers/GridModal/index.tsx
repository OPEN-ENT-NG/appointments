import { FC, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { GRID_MODAL_TYPE, PAGE_TYPE } from "./enum";
import { contentBoxStyle, modalBoxStyle } from "./style";
import { GridModalProps } from "./types";
import { FirstPageGridModal } from "../FirstPageGridModal";
import { SecondPageGridModal } from "../SecondPageGridModal";
import { CustomStepper } from "~/components/CustomStepper";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";

export const GridModal: FC<GridModalProps> = ({
  isOpen,
  handleClose,
  gridModalType,
}) => {
  const { t } = useTranslation("appointments");
  const [page, setPage] = useState<PAGE_TYPE>(PAGE_TYPE.FIRST);

  const isDisplayFirstPage =
    gridModalType === GRID_MODAL_TYPE.EDIT || page === PAGE_TYPE.FIRST;
  const isDisplaySecondPage =
    gridModalType === GRID_MODAL_TYPE.EDIT || page === PAGE_TYPE.SECOND;

  return (
    <Modal open={isOpen}>
      <Box sx={modalBoxStyle}>
        <Box sx={contentBoxStyle}>
          <Box sx={spaceBetweenBoxStyle}>
            <Typography variant="h3">
              {t("appointments.create.grid.title")}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>
            {t("appointments.grid.required")}
          </Typography>
          {isDisplayFirstPage && <FirstPageGridModal />}
          {isDisplaySecondPage && <SecondPageGridModal />}
          <CustomStepper
            page={page}
            setPage={setPage}
            handleCancel={handleClose}
            handleSave={handleClose}
          />
        </Box>
      </Box>
    </Modal>
  );
};
