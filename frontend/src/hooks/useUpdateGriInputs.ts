import { SelectChangeEvent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useCallback } from "react";
import { PERIODICITY, SLOT_DURATION } from "~/core/enums";
import { useGridModalProvider } from "~/providers/GridModalProvider";
import { GridModalInputs, Public } from "~/providers/GridModalProvider/types";
import { initialPublic, initialWeekSlots } from "~/providers/GridModalProvider/utils";

export const useUpdateGridInputs = () => {
  const { inputs, setInputs, structureOptions } = useGridModalProvider();

  const updateInputField = useCallback(
    <K extends keyof GridModalInputs>(field: K, value: GridModalInputs[K]) => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field]: value,
      }));
    },
    [setInputs],
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputField("name", e.target.value);
  };

  const handleStructureChange = (event: SelectChangeEvent) => {
    const structure = structureOptions.find(
      (structure) => structure.id === event.target.value,
    );
    updateInputField("structure", structure || { id: "", name: "" });
    updateInputField("public", initialPublic);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputField("location", e.target.value);
  };

  const handlePublicChange = (_: React.SyntheticEvent, value: Public[]) => {
    updateInputField("public", value);
  };

  const handleIsVisioChange = () => {
    updateInputField("isVisio", !inputs.isVisio);
  };

  const handleVisioLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputField("visioLink", e.target.value);
  };

  const handlePublicCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputField("publicComment", e.target.value);
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    const startDate = date ? date : undefined;
    const endDate = inputs.validityPeriod.end;
    const newEndDate =
      endDate && startDate && dayjs(startDate).isAfter(endDate)
        ? undefined
        : endDate;
    updateInputField("validityPeriod", { start: startDate, end: newEndDate });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    const endDate = date ? date : undefined;
    updateInputField("validityPeriod", {
      start: inputs.validityPeriod.start,
      end: endDate,
    });
  };

  const handleSlotDurationChange = (_:React.MouseEvent<HTMLElement>, value: SLOT_DURATION) => {
    updateInputField("slotDuration", value);
    updateInputField("weekSlots", initialWeekSlots);
  }

  const handlePeriodicityChange = (_:React.MouseEvent<HTMLElement>, value: PERIODICITY) => {
    updateInputField("periodicity", value);
  }


  return {
    handleNameChange,
    handleStructureChange,
    handleLocationChange,
    handlePublicChange,
    handleIsVisioChange,
    handleVisioLinkChange,
    handlePublicCommentChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSlotDurationChange,
    handlePeriodicityChange,
  };
};
