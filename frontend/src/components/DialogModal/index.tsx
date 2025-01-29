import { FC } from "react";

import {
  Box,
  Button,
  FormControl,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  buttonsBoxStyle,
  buttonStyle,
  cancelButtonStyle,
  contentBoxStyle,
  modalBoxStyle,
} from "./style";
import { DialogModalProps } from "./types";

export const DialogModal: FC<DialogModalProps> = ({
  open,
  title,
  description,
  handleCancel,
  handleConfirm,
  question,
  options,
  selectedOption,
  handleOptionChange,
}) => {
  console.log("selectedOption", selectedOption);
  const { t } = useTranslation("appointments");
  return (
    <Modal open={open}>
      <Box sx={modalBoxStyle}>
        <Box sx={contentBoxStyle}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5">{description}</Typography>
          {question && options && handleOptionChange && selectedOption && (
            <>
              <Typography variant="body1">{question}</Typography>
              <FormControl>
                <RadioGroup
                  value={selectedOption}
                  onChange={(e) => handleOptionChange(e.target.value)}
                >
                  {options.map((option) => (
                    <Radio value={option} key={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          )}
          <Box sx={buttonsBoxStyle}>
            <Button onClick={handleCancel} sx={cancelButtonStyle}>
              {t("appointments.cancel")}
            </Button>
            <Button
              onClick={handleConfirm}
              sx={buttonStyle}
              variant="contained"
            >
              {t("appointments.confirm")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
