import { Dispatch, SetStateAction, useCallback } from "react";

import {
  GridModalInputs,
  InputsErrors,
} from "~/providers/GridModalProvider/types";

export const useBlurGridInputs = (
  inputs: GridModalInputs,
  setErrorInputs: Dispatch<SetStateAction<InputsErrors>>,
) => {
  const updateErrorInputs = useCallback(
    <K extends keyof InputsErrors>(field: K, value: InputsErrors[K]) => {
      setErrorInputs((prevInputs) => ({
        ...prevInputs,
        [field]: value,
      }));
    },
    [setErrorInputs],
  );

  const newNameError = inputs.name ? "" : "Le nom est obligatoire";

  const newVisioLinkError =
    inputs.isVisio && !inputs.visioLink
      ? "Le lien de visio est obligatoire"
      : "";

  const handleNameBlur = () => {
    updateErrorInputs("name", newNameError);
  };

  const handleVisioLinkBlur = () => {
    updateErrorInputs(
      "visioLink",
      newVisioLinkError,
    );
  };

  const handleValidityPeriodBlur = () => {
    updateErrorInputs(
      "validityPeriod",
      inputs.validityPeriod.start && inputs.validityPeriod.end
        ? ""
        : "La période de validité est obligatoire",
    );
  };

  const handleWeekSlotsBlur = () => {
    updateErrorInputs(
      "weekSlots",
      Object.values(inputs.weekSlots).some((day) => day.length === 0)
        ? "Les créneaux de la semaine sont obligatoires"
        : "",
    );
  };

  return {
    newNameError,
    newVisioLinkError,
    handleNameBlur,
    handleVisioLinkBlur,
    handleValidityPeriodBlur,
    handleWeekSlotsBlur,
  };
};
