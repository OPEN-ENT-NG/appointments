import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GridModalInputs,
  GridModalProviderContextProps,
  GridModalProviderProps,
  Public,
  Structure,
} from "./types";
import { initialGridModalInputs, userStructures } from "./utils";
import { useUser } from "@edifice-ui/react";
import { use } from "i18next";
import { PERIODICITY, SLOT_DURATION } from "~/core/enums";

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

  const [inputs, setInputs] = useState<GridModalInputs>(initialGridModalInputs(structures));

  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      structure: structures.length ? structures[0] : { id: "", name: "" },
    }));
  }
  , [user]);
  
  const mockPublicList: Public[] = [
    { name: "Public 1", id: "1" },
    { name: "Public 2", id: "2" },
    { name: "Public 3", id: "3" },
    { name: "Public 4", id: "4" },
    { name: "Public 5", id: "5" },
  ];

  const slotDurationOptions : SLOT_DURATION[] = [
    SLOT_DURATION.FIVETEEN_MINUTES,
    SLOT_DURATION.THIRTY_MINUTES,
    SLOT_DURATION.FOURTYFIVE_MINUTES,
    SLOT_DURATION.ONE_HOUR,
  ];
    
  const periodicityOptions: PERIODICITY[] = [
    PERIODICITY.WEEKLY,
    PERIODICITY.BIWEEKLY,
  ];

  const value = useMemo<GridModalProviderContextProps>(
    () => ({
      inputs,
      setInputs,
      structureOptions: structures,
      publicOptions: mockPublicList,
      slotDurationOptions,
      periodicityOptions,
    }),
    [inputs, setInputs, structures, mockPublicList],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
