import { FC, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Pagination, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  emptyStateStyle,
  GridListContentStyle,
  gridListStyle,
  GridListTitle,
  paginationStyle,
} from "./style";
import { GridListProps } from "./types";
import { GridCard } from "~/components/GridCard";
import { GRID_PER_PAGE } from "~/core/constants";
import { useAvailabilityProvider } from "~/providers/AvailabilityProvider";
import { GRID_TYPE } from "~/providers/AvailabilityProvider/enum";

export const GridList: FC<GridListProps> = ({ gridType, cardSize }) => {
  const { t } = useTranslation("appointments");
  const {
    gridPages: { [gridType]: page },
    gridTypeLengths: {
      [gridType]: gridsLength,
      [GRID_TYPE.IN_PROGRESS]: inProgressGridsLength,
    },
    currentGridList: { [gridType]: grids },
    handleChangePage,
  } = useAvailabilityProvider();

  const isGridListEmpty = !gridsLength;

  const isExpandable = gridType === GRID_TYPE.CLOSED && !!inProgressGridsLength;

  const [isExpanded, setIsExpanded] = useState<boolean>(
    gridType === GRID_TYPE.IN_PROGRESS || !isExpandable,
  );

  const handleChangeExpanded = () => {
    if (gridType === GRID_TYPE.CLOSED && isExpandable)
      setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {isGridListEmpty ? (
        <>
          {gridType === GRID_TYPE.IN_PROGRESS && (
            <Typography sx={emptyStateStyle}>
              {t("appointments.grid.in.progress.empty.state")}
            </Typography>
          )}
        </>
      ) : (
        <Box sx={gridListStyle}>
          <GridListTitle
            onClick={handleChangeExpanded}
            isExpandable={isExpandable}
          >
            <Typography variant="h4">
              {t(
                `appointments.grid.${
                  gridType === GRID_TYPE.IN_PROGRESS ? "in.progress" : "passed"
                }`,
              )}
            </Typography>
            {isExpandable && (
              <>
                {isExpanded ? (
                  <ExpandLessIcon fontSize="large" />
                ) : (
                  <ExpandMoreIcon fontSize="large" />
                )}
              </>
            )}
          </GridListTitle>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={GridListContentStyle}>
              {grids.map((grid) => (
                <GridCard key={grid.id} grid={grid} size={cardSize} />
              ))}
              {gridsLength > GRID_PER_PAGE && (
                <Pagination
                  count={Math.ceil(gridsLength / GRID_PER_PAGE)}
                  page={page}
                  onChange={(_, newPage) => handleChangePage(gridType, newPage)}
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                  variant="text"
                  sx={paginationStyle}
                />
              )}
            </Box>
          </Collapse>
        </Box>
      )}
    </>
  );
};