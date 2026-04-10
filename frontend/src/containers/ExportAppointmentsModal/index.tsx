import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@cgi-learning-hub/ui";
import { IExportAppointmentsModalProps } from "./type";
import { FC } from "react";
import { t } from "~/i18n";

export const ExportAppointmentsModal: FC<IExportAppointmentsModalProps> = ({ isOpen, handleClose, handleExport }) => {
  return (
    <Dialog 
      maxWidth={"md"}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>{t("appointments.event.export.all.modal.title")}</DialogTitle>
      <DialogContent>
        <Stack gap={3}>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{t("appointments.event.export.all.modal.body1")}</Typography>
          <Typography>{t("appointments.event.export.all.modal.body2")}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          {t("appointments.cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleExport}
        >
          {t("appointments.download")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};