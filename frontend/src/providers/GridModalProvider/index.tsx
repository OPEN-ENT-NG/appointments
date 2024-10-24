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
import { use } from "i18next";

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

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      structure: structures.length ? structures[0] : { id: "", name: "" },
    }));
  }, [user]);

  const updateInputField = useCallback(
    <K extends keyof GridModalInputs>(field: K, value: GridModalInputs[K]) => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [field]: value,
      }));
    },
    [setInputs],
  );

  const value = useMemo<GridModalProviderContextProps>(
    () => ({
      inputs,
      setInputs,
      structureOptions: structures,
      publicOptions: mockPublicList,
      slotDurationOptions,
      periodicityOptions,
      updateInputField,
    }),
    [inputs, setInputs, structures, mockPublicList],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
