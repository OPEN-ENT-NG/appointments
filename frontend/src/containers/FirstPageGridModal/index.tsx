import { FC } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ColorPicker } from "~/components/ColorPicker";
import {
  flexEndBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/styles/boxStyles";
import { CustomMultiAutocomplete } from "~/components/CustomMultiAutocomplete";
import { Public } from "../GridModal/types";
import { pageGridModalStyle } from "../GridModal/style";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const FirstPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const { inputs, setInputs, structureOptions, publicOptions } =
    useGridModalProvider();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, name: e.target.value });
  }

  const handleStructureChange = (event: SelectChangeEvent) => {
    const structure = structureOptions.find(
      (structure) => structure.id === event.target.value
    );
    setInputs({
      ...inputs,
      structure: structure || { id: "", name: "" },
      public: [],
    });
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, location: e.target.value });
  }

  const handleVisioChange = () => {
    setInputs({ ...inputs, isVisio: !inputs.isVisio });
  }

  const handleVisioLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, visioLink: e.target.value });
  }

  const handlePublicChange = (value: Public[]) => {
    setInputs({ ...inputs, public: value });
  }

  const handlePublicCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, publicComment: e.target.value });
  }

  return (
    <Box sx={pageGridModalStyle}>
      <Box sx={spaceBetweenBoxStyle}>
        <TextField
          id="grid-name"
          label={
            t("appointments.grid.name") +
            " * " +
            t("appointments.grid.visible.all")
          }
          variant="outlined"
          sx={{ width: "100%" }}
          value={inputs.name}
          onChange={handleNameChange}
        />
        <Box sx={flexEndBoxStyle}>
          <Typography>{t("appointments.grid.color") + " * "}</Typography>
          <ColorPicker />
        </Box>
      </Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">
          {t("appointments.grid.structure") + " * "}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={t("appointments.grid.structure")}
          value={inputs.structure.id}
          onChange={handleStructureChange}
        >
          {structureOptions.map((structure) => (
            <MenuItem key={structure.id} value={structure.id}>
              {structure.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="grid-location"
        label={t("appointments.grid.location")}
        variant="outlined"
        value={inputs.location}
        onChange={handleLocationChange}
      />
      <CustomMultiAutocomplete
        options={publicOptions}
        selectedPublic={inputs.public}
        handleSelectedChange={handlePublicChange}
      />
      <Box sx={flexStartBoxStyle}>
        <Typography>{t("appointments.grid.videoconference")}</Typography>
        <Switch
          checked={inputs.isVisio}
          onChange={handleVisioChange}
        />
      </Box>
      {inputs.isVisio && (
        <TextField
          id="grid-visio-link"
          label={t("appointments.grid.videoconference.link") + " *"}
          variant="outlined"
          value={inputs.visioLink}
          onChange={handleVisioLinkChange}
        />
      )}
      <TextField
        id="grid-public-comment"
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
      />
    </Box>
  );
};
