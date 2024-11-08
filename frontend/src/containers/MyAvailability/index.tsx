import { FC, useEffect, useMemo, useRef, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  availabilityContainerStyle,
  emptyStateStyle,
  emptyStateSvgStyle,
  headerStyle,
} from "./style";
import { GridList } from "../GridList";
import { GridModal } from "../GridModal";
import { GRID_MODAL_TYPE } from "../GridModal/enum";
import { AvailabilityEmptyState } from "~/components/SVG/AvailabilityEmptyState";
import { useAvailabilityProvider } from "~/providers/AvailabilityProvider";
import {
  GRID_CARD_SIZE,
  GRID_TYPE,
} from "~/providers/AvailabilityProvider/enum";
import { useGlobalProvider } from "~/providers/GlobalProvider";
import { MODAL_TYPE } from "~/providers/GlobalProvider/enum";
import { PURPLE } from "~/styles/constants";

export const MyAvailability: FC = () => {
  const { t } = useTranslation("appointments");
  const {
    displayModals: { grid },
    handleDisplayModal,
  } = useGlobalProvider();

  const [gridModalType] = useState<GRID_MODAL_TYPE>(GRID_MODAL_TYPE.CREATION);
  const [gridCardSize, setGridCardSize] = useState<GRID_CARD_SIZE>(
    GRID_CARD_SIZE.LARGE,
  );

  const { gridListLengths } = useAvailabilityProvider();
  const isAllGridListEmpty = useMemo(
    () =>
      gridListLengths[GRID_TYPE.IN_PROGRESS] === 0 &&
      gridListLengths[GRID_TYPE.CLOSED] === 0,
    [gridListLengths],
  );

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateGridCardSize = () => {
      if (boxRef.current) {
        const boxWidth = boxRef.current.offsetWidth;
        setGridCardSize(
          boxWidth < 882 ? GRID_CARD_SIZE.SMALL : GRID_CARD_SIZE.LARGE,
        );
      }
    };
    const observer = new ResizeObserver(updateGridCardSize);
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    updateGridCardSize();
    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <>
      <GridModal
        isOpen={grid}
        handleClose={() => handleDisplayModal(MODAL_TYPE.GRID)}
        gridModalType={gridModalType}
      />
      <Box ref={boxRef} sx={availabilityContainerStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h2">
            {t("appointments.my.availability")}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => handleDisplayModal(MODAL_TYPE.GRID)}
          >
            {t("appointments.create.grid")}
          </Button>
        </Box>
        {isAllGridListEmpty ? (
          <>
            <Typography sx={emptyStateStyle}>
              {t("appointments.grid.empty.state")}
            </Typography>
            <Box sx={emptyStateSvgStyle}>
              <AvailabilityEmptyState fill={PURPLE} />
            </Box>
          </>
        ) : (
          <>
            <GridList
              gridType={GRID_TYPE.IN_PROGRESS}
              cardSize={gridCardSize}
            />
            <GridList gridType={GRID_TYPE.CLOSED} cardSize={gridCardSize} />
          </>
        )}
      </Box>
    </>
  );
};
