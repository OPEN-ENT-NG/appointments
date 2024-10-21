import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import { FC } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CustomMultiAutocompleteProps } from "./types";

export const CustomMultiAutocomplete: FC<CustomMultiAutocompleteProps> = ({
  publicList,
  selectedPublic,
  setSelectedPublic,
}) => {
  return (
    <Autocomplete
        multiple
        options={publicList}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
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
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Checkboxes"
            placeholder="Favorites"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <Chip
                    variant="outlined"
                    label="Default Chip"
                    style={{ marginRight: 4 }}
                  />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
  );
};
