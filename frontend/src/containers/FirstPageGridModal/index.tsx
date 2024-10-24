import { FC } from "react";

import {
  Box,
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
import {
  flexEndBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/styles/boxStyles";
import { CustomMultiAutocomplete } from "~/components/CustomMultiAutocomplete";
import { Public } from "../GridModal/types";
import { pageGridModalStyle } from "../GridModal/style";

export const FirstPageGridModal: FC = () => {
  const { t } = useTranslation("appointments");

  const mockPublicList: Public[] = [
    { name: "Public 1", id: "1" },
    { name: "Public 2", id: "2" },
    { name: "Public 3", id: "3" },
    { name: "Public 4", id: "4" },
    { name: "Public 5", id: "5" },
  ];

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
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="grid-location"
        label={t("appointments.grid.location")}
        variant="outlined"
      />
      <CustomMultiAutocomplete
        publicList={mockPublicList}
        selectedPublic={[]}
        setSelectedPublic={() => {}}
      />
      <Box sx={flexStartBoxStyle}>
        <Typography>{t("appointments.grid.videoconference")}</Typography>
        <Switch />
      </Box>
      <TextField
        id="grid-visio-link"
        label={t("appointments.grid.videoconference.link") + " *"}
        variant="outlined"
      />
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
      />
    </Box>
  );
};
