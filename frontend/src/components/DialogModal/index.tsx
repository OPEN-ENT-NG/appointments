import { FC, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@cgi-learning-hub/ui";

import { Button } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { APPOINTMENTS, CONFIRM_MODAL_VALUES } from "~/core/constants";
import { DialogModalProps } from "./types";

export const DialogModal: FC<DialogModalProps> = ({
  open,
  type,
  isSubmitButtonLoading = false,
  showOptions = true,
  handleCancel,
  handleConfirm,
}) => {
  const { t } = useTranslation(APPOINTMENTS);
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

  const handleClose = (_: object, reason: string) => {
    if (reason === "backdropClick" && isSubmitButtonLoading) return;
    return handleCancel();
  };

  return (
    <Dialog
      open={open}
      showCloseButton={!isSubmitButtonLoading}
      onClose={handleClose}
    >
      <DialogTitle fontWeight="bold" fontSize="2rem">
        {title}
      </DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body1">{description}</Typography>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={handleCancel}
          disabled={isSubmitButtonLoading}
        >
          {t("appointments.cancel")}
        </Button>
        <Button
          onClick={() => handleConfirm(selectedOption || undefined)}
          variant="contained"
          loading={isSubmitButtonLoading}
        >
          {t("appointments.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
