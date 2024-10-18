import { FC, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { PAGE_TYPE } from "./enum";
import { modalBoxStyle } from "./style";
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

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalBoxStyle}>
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h3">
            {t("appointments.create.grid.title")}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {page === PAGE_TYPE.FIRST && <FirstPageGridModal />}
        {page === PAGE_TYPE.SECOND && <SecondPageGridModal />}
        <CustomStepper
          page={page}
          setPage={setPage}
          handleCancel={handleClose}
          handleSave={handleClose}
        />
      </Box>
    </Modal>
  );
};
