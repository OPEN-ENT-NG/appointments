import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useUser } from "@edifice-ui/react";

import {
  GridModalInputs,
  GridModalProviderContextProps,
  GridModalProviderProps,
  Structure,
} from "./types";
import {
  initialGridModalInputs,
  mockPublicList,
  periodicityOptions,
  slotDurationOptions,
  userStructures,
} from "./utils";
import { useUpdateGridInputsReturnType } from "~/hooks/types";
import { useUpdateGridInputs } from "~/hooks/useUpdateGridInputs";

const GridModalProviderContext =
  createContext<GridModalProviderContextProps | null>(null);

export const useGridModalProvider = () => {
  const context = useContext(GridModalProviderContext);
  if (!context) {
    throw new Error(
      "useGridModalProvider must be used within a GridModalProvider",
    );
  }
  return context;
};

export const GridModalProvider: FC<GridModalProviderProps> = ({ children }) => {
  const { user } = useUser();
  const structures: Structure[] = user ? userStructures(user) : [];

  const [inputs, setInputs] = useState<GridModalInputs>(
    initialGridModalInputs(structures),
  );

  const updateGridModalInputs : useUpdateGridInputsReturnType = useUpdateGridInputs(
    inputs,
    setInputs,
    structures,
  );

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      structure: structures.length ? structures[0] : { id: "", name: "" },
    }));
  }, [user]);

  const value = useMemo<GridModalProviderContextProps>(
    () => ({
      inputs,
      setInputs,
      structureOptions: structures,
      publicOptions: mockPublicList,
      slotDurationOptions,
      periodicityOptions,
      updateGridModalInputs,
    }),
    [inputs, setInputs, structures, mockPublicList],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
