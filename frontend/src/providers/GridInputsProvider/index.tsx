import { createContext, FC, useContext, useMemo, useState } from "react";
import {
  GridModalInputs,
  GridModalProviderContextProps,
  GridModalProviderProps,
  Structure,
} from "./types";
import { initialGridModalInputs, userStructures } from "./utils";
import { useUser } from "@edifice-ui/react";

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
    initialGridModalInputs(structures[0]),
  );

  const value = useMemo<GridModalProviderContextProps>(
    () => ({
      inputs,
      setInputs,
    }),
    [inputs, setInputs],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
