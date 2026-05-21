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
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";

export const ExportAppointmentsModal: FC<IExportAppointmentsModalProps> = ({
  isOpen,
  handleClose,
  handleExport,
}) => {
  const { isExportingAppointments } = useMyAppointments();

  return (
    <Dialog maxWidth={"sm"} open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {t("appointments.event.export.all.modal.title")}
      </DialogTitle>
      <DialogContent>
        <Stack gap={3}>
          <Typography
            dangerouslySetInnerHTML={{
              __html: t("appointments.event.export.all.modal.body"),
            }}
          />
          <Typography>
            {t("appointments.event.export.all.modal.end")}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          {t("appointments.cancel")}
        </Button>
        <Button
          variant="contained"
          loading={isExportingAppointments}
          onClick={handleExport}
        >
          {t("appointments.download")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
