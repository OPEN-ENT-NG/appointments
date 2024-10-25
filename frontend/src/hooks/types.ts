import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";

import { PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { GridModalInputs, Public, Structure } from "~/providers/GridModalProvider/types";

export interface useUpdateGridInputsReturnType {
    updateInputField: <K extends keyof GridModalInputs>(field: K, value: GridModalInputs[K]) => void;
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleStructureChange: (event: SelectChangeEvent) => void;
    handleLocationChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePublicChange: (_: React.SyntheticEvent, value: Public[]) => void;
    handleIsVisioChange: () => void;
    handleVisioLinkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePublicCommentChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleStartDateChange: (date: Dayjs | null) => void;
    handleEndDateChange: (date: Dayjs | null) => void;
    handleSlotDurationChange: (_: React.MouseEvent<HTMLElement>, value: SLOT_DURATION) => void
    handlePeriodicityChange: (_: React.MouseEvent<HTMLElement>, value: PERIODICITY) => void
    }

export type useUpdateGridInputsType = (
    inputs: GridModalInputs,
    setInputs: Dispatch<SetStateAction<GridModalInputs>>,
    structureOptions: Structure[],
    ) => useUpdateGridInputsReturnType;

    
