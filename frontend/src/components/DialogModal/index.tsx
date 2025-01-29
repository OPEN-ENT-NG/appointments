import { FC, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { CONFIRM_MODAL_VALUES } from "~/core/constants";
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
  type,
  showOptions = true,
  handleCancel,
  handleConfirm,
}) => {
  const { t } = useTranslation("appointments");
  const title = t(CONFIRM_MODAL_VALUES[type].titleKey);
  const description = t(CONFIRM_MODAL_VALUES[type].descriptionKey);
  const question = t(CONFIRM_MODAL_VALUES[type].questionKey);
  const options = CONFIRM_MODAL_VALUES[type].options.map((option) => t(option));

  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0],
  );
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Modal open={open}>
      <Box sx={modalBoxStyle}>
        <Box sx={contentBoxStyle}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5">{description}</Typography>
          {showOptions && question && options.length && (
            <>
              <Typography variant="body1">{question}</Typography>
              <FormControl>
                <RadioGroup
                  value={selectedOption}
                  onChange={(e) => handleOptionChange(e.target.value)}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
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
              onClick={() => handleConfirm(selectedOption || undefined)}
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
