import { FC, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { PAGE_TYPE } from "./enum";
import { modalBoxStyle } from "./style";
import { FirstPageInputs, GridModalProps, SecondPageInputs, Structure } from "./types";
import { FirstPageGridModal } from "../FirstPageGridModal";
import { SecondPageGridModal } from "../SecondPageGridModal";
import { CustomStepper } from "~/components/CustomStepper";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { initialFirstPageInputs, initialSecondPageInputs, userStructures } from "./utils";
import { useUser } from "@edifice-ui/react";

export const GridModal: FC<GridModalProps> = ({
  isOpen,
  handleClose,
  gridModalType,
}) => {
  const { t } = useTranslation("appointments");
  const [page, setPage] = useState<PAGE_TYPE>(PAGE_TYPE.FIRST);
  const { user } = useUser();
  const structures: Structure[] = user ? userStructures(user) : [];

  const [firstPageInputs, setFirstPageInputs] = useState<FirstPageInputs>(
    initialFirstPageInputs(structures),
  );

  const [secondPageInputs, setSecondPageInputs] = useState<SecondPageInputs>(
    initialSecondPageInputs(),
  );    

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
        <Typography sx={{ fontStyle: "italic" }}>
          {t("appointments.grid.required")}
        </Typography>
        {page === PAGE_TYPE.FIRST && 
          <FirstPageGridModal
            firstPageInputs={firstPageInputs}
            setFirstPageInputs={setFirstPageInputs}
          />
        }
        {page === PAGE_TYPE.SECOND && <SecondPageGridModal 
        
        />}
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
