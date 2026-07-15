import { FC, MouseEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@cgi-learning-hub/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { t } from "~/i18n";
import { preventPropagation } from "~/core/utils";
import { useMyAppointments } from "~/providers/MyAppointmentsProvider";
import { smallButton } from "~/containers/MyAppointmentsCalendar/style";

export const OrganizeFilter: FC = () => {
  const {
    calendarFilters: filters,
    nbCheckedFilters,
    handleClearFilterType,
    handleCheckboxChange,
  } = useMyAppointments();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<FilterAltRoundedIcon />}
        onClick={handleOpen}
        sx={{
          ...smallButton,
          paddingRight: "0.5rem",
          "&:hover .MuiChip-root": {
            backgroundColor: "white",
            color: "secondary.main",
          },
        }}
      >
        {t("appointments.filters")}
        {nbCheckedFilters > 0 && (
          <Chip
            color="secondary"
            size="small"
            label={nbCheckedFilters}
            sx={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
          />
        )}
        {anchorEl ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack spacing={2} sx={{ padding: "0.8rem 1.6rem 1.6rem" }}>
          <Typography variant="h6" sx={{ fontSize: "1.6rem" }}>
            {t("appointments.filters.filter.by")}
          </Typography>

          <Stack spacing={2}>
            {filters.map((filter) => {
              const title = t(
                `appointments.${filter.type.toLocaleLowerCase()}`,
              );
              return (
                <Box key={filter.type}>
                  {/* Filter type */}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", marginBottom: "0.4rem" }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      {title}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<CloseRoundedIcon />}
                      sx={{ minHeight: "3rem", fontSize: "1.3rem" }}
                      onClick={() => handleClearFilterType(filter.type)}
                      disabled={filter.filters.every((f) => !f.checked)}
                    >
                      {t("appointments.filters.clear")}
                    </Button>
                  </Stack>

                  {/* Filter items */}
                  <Stack spacing={1}>
                    {filter.filters.map((filterItem) => {
                      const { id, name, IconComponent } = filterItem;

                      return (
                        <MenuItem key={id} sx={{ padding: "0" }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                            onClick={() => handleCheckboxChange(filterItem)}
                          >
                            <Checkbox
                              checked={filterItem.checked}
                              onChange={preventPropagation}
                            />
                            <Typography>{t(name)}</Typography>
                            {IconComponent}
                          </Stack>
                        </MenuItem>
                      );
                    })}
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Menu>
    </Box>
  );
};
