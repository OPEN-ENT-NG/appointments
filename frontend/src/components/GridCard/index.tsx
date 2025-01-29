import { FC, useState } from "react";

import BusinessIcon from "@mui/icons-material/Business";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { DISPLAY_DATE_FORMAT } from "~/core/constants";
import { CONFIRM_MODAL_TYPE, GRID_STATE } from "~/core/enums";
import { useAvailability } from "~/providers/AvailabilityProvider";
import { GRID_CARD_SIZE } from "~/providers/AvailabilityProvider/enum";
import { useGlobal } from "~/providers/GlobalProvider";
import {
  buttonsBoxStyle,
  cardWrapperStyle,
  ColorDot,
  firstLineBoxStyle,
  leftBoxStyle,
  leftTextWrapperStyle,
  moreButtonBoxStyle,
  moreButtonStyle,
  nameTextStyle,
  secondLineBoxStyle,
  StateDot,
  stateStyle,
  structureIconStyle,
} from "./style";
import { GridCardProps } from "./types";

export const GridCard: FC<GridCardProps> = ({ grid, size }) => {
  const { t } = useTranslation("appointments");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isMultiStructure, getStructureNameById } = useGlobal();
  const { handleOpenDialogModal } = useAvailability();

  const handleClickedMoreButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteConfirmModal = () => {
    handleOpenDialogModal(grid.id, CONFIRM_MODAL_TYPE.DELETE_GRID);
    handleCloseMenu();
  };

  const handleOpenSuspendConfirmModal = () => {
    handleOpenDialogModal(grid.id, CONFIRM_MODAL_TYPE.SUSPEND_GRID);
    handleCloseMenu();
  };

  const handleOpenResumeConfirmModal = () => {
    handleOpenDialogModal(grid.id, CONFIRM_MODAL_TYPE.RESTORE_GRID);
    handleCloseMenu();
  };

  return (
    <Box sx={cardWrapperStyle}>
      <Box sx={leftBoxStyle}>
        <ColorDot color={grid.color} />
        <Box sx={leftTextWrapperStyle}>
          <Box sx={firstLineBoxStyle}>
            <Typography variant="h5" sx={nameTextStyle}>
              {grid.name}
            </Typography>
            {isMultiStructure && (
              <Tooltip
                title={getStructureNameById(grid.structureId)}
                placement="top"
                arrow
              >
                <BusinessIcon sx={structureIconStyle} />
              </Tooltip>
            )}
          </Box>
          <Box sx={secondLineBoxStyle}>
            <Typography variant="body1">
              {t("appointments.grid.from.date.to.date", {
                beginDate: grid.beginDate.format(DISPLAY_DATE_FORMAT),
                endDate: grid.endDate.format(DISPLAY_DATE_FORMAT),
              })}
            </Typography>
            <Box sx={stateStyle}>
              <StateDot state={grid.state} />
              <Typography variant="body1">
                {t(`appointments.grid.state.${grid.state.toLowerCase()}`)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {size === GRID_CARD_SIZE.LARGE ? (
        !(grid.state === GRID_STATE.CLOSED) ? (
          <Box sx={buttonsBoxStyle}>
            <Button variant="outlined" startIcon={<EditIcon />}>
              {t("appointments.edit")}
            </Button>
            {grid.state === GRID_STATE.OPEN ? (
              <Button
                variant="outlined"
                startIcon={<PauseRoundedIcon />}
                onClick={handleOpenSuspendConfirmModal}
              >
                {t("appointments.suspend")}
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<PlayArrowRoundedIcon />}
                onClick={handleOpenResumeConfirmModal}
              >
                {t("appointments.resume")}
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<DeleteRoundedIcon />}
              onClick={handleOpenDeleteConfirmModal}
            >
              {t("appointments.delete")}
            </Button>
          </Box>
        ) : (
          <Button variant="outlined" startIcon={<VisibilityRoundedIcon />}>
            {t("appointments.consult")}
          </Button>
        )
      ) : (
        <Box sx={moreButtonBoxStyle}>
          <IconButton sx={moreButtonStyle} onClick={handleClickedMoreButton}>
            <MoreVertRoundedIcon />
          </IconButton>
          <Menu
            open={!!anchorEl}
            onClose={handleCloseMenu}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {grid.state === GRID_STATE.CLOSED ? (
              <MenuItem>
                <VisibilityRoundedIcon />
                {t("appointments.consult")}
              </MenuItem>
            ) : (
              <>
                <MenuItem>
                  <EditIcon />
                  {t("appointments.edit")}
                </MenuItem>
                {grid.state === GRID_STATE.OPEN ? (
                  <MenuItem onClick={handleOpenSuspendConfirmModal}>
                    <PauseRoundedIcon />
                    {t("appointments.suspend")}
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleOpenResumeConfirmModal}>
                    <PlayArrowRoundedIcon />
                    {t("appointments.resume")}
                  </MenuItem>
                )}
                <MenuItem onClick={handleOpenDeleteConfirmModal}>
                  <DeleteRoundedIcon />
                  {t("appointments.delete")}
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      )}
    </Box>
  );
};
