import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import { FC } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CustomMultiAutocompleteProps } from "./types";
import { Public } from "~/providers/GridModalProvider/types";
import { useTranslation } from "react-i18next";

export const CustomMultiAutocomplete: FC<CustomMultiAutocompleteProps> = ({
  options,
  selectedPublic,
  handleSelectedChange,
}) => {
  const { t } = useTranslation("appointments");
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedPublic}
      onChange={(_, value) => handleSelectedChange(value)}
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
