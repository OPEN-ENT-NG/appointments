import { FC } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ColorPicker } from "~/components/ColorPicker";
import { CustomMultiAutocomplete } from "~/components/CustomMultiAutocomplete";
import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  APPOINTMENTS,
  MAX_STRING_LENGTH,
} from "~/core/constants";
import { useGlobal } from "~/providers/GlobalProvider";
import { useGridModal } from "~/providers/GridModalProvider";
import { GRID_MODAL_TYPE } from "~/providers/GridModalProvider/enum";
import { flexStartBoxStyle, spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { pageGridModalStyle } from "../GridModal/style";
import {
  addDocumentStyle,
  colorStyle,
  docsInfosStyle,
  firstLineStyle,
  nameStyle,
  selectStyle,
  VisuallyHiddenInput,
} from "./style";

import { FileList } from "@cgi-learning-hub/ui";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useFiles } from "~/providers/GridModalProvider/useFiles";

export const FirstPageGridModal: FC = () => {
  const { t } = useTranslation(APPOINTMENTS);
  const { isMultiStructure } = useGlobal();
  const {
    inputs,
    errorInputs,
    structureOptions,
    updateGridModalInputs: {
      handleNameChange,
      handleStructureChange,
      handleLocationChange,
      handleIsVideoCallChange,
      handleVideoCallLinkChange,
      handlePublicCommentChange,
    },
    blurGridModalInputs: { handleNameBlur, handleVideoCallLinkBlur },
    modalType,
  } = useGridModal();

  const { files, totalFilesSize, handleAddFile, handleDeleteFile } = useFiles();

  return (
    <Box sx={pageGridModalStyle}>
      <Box sx={firstLineStyle}>
        <TextField
          label={
            t("appointments.grid.name") +
            " * " +
            t("appointments.grid.visible.all")
          }
          variant="outlined"
          sx={nameStyle}
          value={inputs.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          error={!!errorInputs.name}
          helperText={t(errorInputs.name)}
          disabled={modalType === GRID_MODAL_TYPE.CONSULTATION}
        />
        <Box sx={colorStyle}>
          <Typography>{t("appointments.grid.color") + " * "}</Typography>
          <ColorPicker />
        </Box>
      </Box>
      <FormControl fullWidth>
        <InputLabel sx={{ width: "fit-content" }}>
          {t("appointments.grid.structure") + " * "}
        </InputLabel>
        <Select
          label={t("appointments.grid.structure") + " * "}
          value={inputs.structure.id}
          onChange={handleStructureChange}
          sx={selectStyle}
          disabled={!isMultiStructure || modalType !== GRID_MODAL_TYPE.CREATION}
        >
          {structureOptions.map((structure: { id: string; name: string }) => (
            <MenuItem key={structure.id} value={structure.id}>
              {structure.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label={t("appointments.grid.location")}
        variant="outlined"
        value={inputs.location}
        onChange={handleLocationChange}
        disabled={modalType === GRID_MODAL_TYPE.CONSULTATION}
      />
      <CustomMultiAutocomplete />
      <Box sx={flexStartBoxStyle}>
        <Typography>{t("appointments.grid.videoconference")}</Typography>
        <Switch
          checked={inputs.isVideoCall}
          onChange={handleIsVideoCallChange}
          disabled={modalType !== GRID_MODAL_TYPE.CREATION}
        />
      </Box>
      {inputs.isVideoCall && (
        <TextField
          label={t("appointments.grid.videoconference.link") + " *"}
          variant="outlined"
          value={inputs.videoCallLink}
          onChange={handleVideoCallLinkChange}
          onBlur={handleVideoCallLinkBlur}
          error={!!errorInputs.videoCallLink.length}
          helperText={t(errorInputs.videoCallLink)}
          disabled={modalType === GRID_MODAL_TYPE.CONSULTATION}
        />
      )}
      <TextField
        label={
          t("appointments.grid.comment") +
          " " +
          t("appointments.grid.visible.all")
        }
        variant="outlined"
        multiline
        rows={4}
        value={inputs.publicComment}
        onChange={handlePublicCommentChange}
        helperText={
          inputs.publicComment.length === MAX_STRING_LENGTH &&
          t("appointments.grid.comment.text.helper")
        }
        error={inputs.publicComment.length === MAX_STRING_LENGTH}
        disabled={modalType === GRID_MODAL_TYPE.CONSULTATION}
      />
      <Box sx={spaceBetweenBoxStyle}>
        <Button
          component="label"
          variant="outlined"
          color="secondary"
          tabIndex={-1}
          startIcon={<UploadFileIcon />}
          sx={addDocumentStyle}
        >
          {t("appointments.grid.add.document")}
          <VisuallyHiddenInput
            type="file"
            accept={ALLOWED_DOCUMENT_EXTENSIONS.join(",")}
            onChange={handleAddFile}
          />
        </Button>
        <Box sx={docsInfosStyle}>
          <Typography>{"5 fichiers max"}</Typography>
          <Typography>
            {"Taille totale des fichiers : " + totalFilesSize + "/100Mo"}
          </Typography>
        </Box>
      </Box>
      <FileList files={files} onDelete={handleDeleteFile} />
    </Box>
  );
};
