import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  MouseEvent,
} from "react";

import { SelectChangeEvent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import { DAY, PERIODICITY, SLOT_DURATION } from "~/core/enums";
import {
  GridModalInputs,
  Public,
  Structure,
} from "~/providers/GridModalProvider/types";
import {
  initialPublic,
  initialWeekSlots,
} from "~/providers/GridModalProvider/utils";
import { useUpdateGridInputsType } from "./types";
import { format } from "path";
import { formatTimeToDayjs } from "~/core/utils";
import { Time, TimeObject } from "~/core/types";

export const useUpdateGridInputs : useUpdateGridInputsType = (
  inputs: GridModalInputs,
  setInputs: Dispatch<SetStateAction<GridModalInputs>>,
  structureOptions: Structure[],
) => {
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

  const handlePublicChange = (_: SyntheticEvent, value: Public[]) => {
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

  const handleSlotDurationChange = (
    _: MouseEvent<HTMLElement>,
    value: SLOT_DURATION,
  ) => {
    updateInputField("slotDuration", value);
    updateInputField("weekSlots", initialWeekSlots);
  };

  const handlePeriodicityChange = (
    _: MouseEvent<HTMLElement>,
    value: PERIODICITY,
  ) => {
    updateInputField("periodicity", value);
  };

  const handleDeleteSlot = (day: DAY, slotId: string) => {
    updateInputField("weekSlots", {
      ...inputs.weekSlots,
      [day]: inputs.weekSlots[day].filter((slot) => slot.id !== slotId),
    });
  }

  const handleSlotChange = (day:DAY, slotId: string, value: string, type: "begin" | "end") => {
    const [hour, minute] = value.split(":");
    const time : TimeObject = { hour: parseInt(hour), minute: parseInt(minute) };
    updateInputField("weekSlots", {
      ...inputs.weekSlots,
      [day]: inputs.weekSlots[day].map((item) => {
        if (item.id !== slotId) return item;
        
        const updatedSlot = {
            ...item,
            [type]: { hour, minute }
        };

        if (
            type === "begin" && 
            updatedSlot.end 
          
        ) {
            const begin = formatTimeToDayjs(time);
            const end = formatTimeToDayjs(updatedSlot.end);
            if (begin.isAfter(end) || begin.isSame(end)) {
                updatedSlot.end = null;
            }
        }

        return updatedSlot;
    })
    });
  }

  return {
    updateInputField,
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
    handleDeleteSlot,
    handleSlotChange,
  };
};
