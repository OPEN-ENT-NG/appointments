import { FC } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useUpdateGridInputs } from "~/hooks/useUpdateGriInputs";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const CustomMultiAutocomplete: FC = () => {
  const { publicOptions, inputs } = useGridModalProvider();
  const { handlePublicChange } = useUpdateGridInputs();
  const selectedPublic = inputs.public;
  const { t } = useTranslation("appointments");
  
  return (
    <Autocomplete
      multiple
      options={publicOptions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedPublic}
      onChange={handlePublicChange}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("appointments.grid.public") + " *"}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {!selectedPublic.length && (
                  <Chip
                    variant="filled"
                    label={t("appointments.everyone")}
                    style={{ margin: "3px" }}
                  />
                )}
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
