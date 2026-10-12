import { ReactNode } from "react";

import { ViewMode } from "./enums";

export interface IToggleButtonItem {
  value: ViewMode;
  icon: ReactNode;
  ariaLabel: string;
}

export interface ISwitchViewProps {
  onChange: (viewMode: ViewMode) => void;
  viewMode: ViewMode;
  toggleButtonList: IToggleButtonItem[];
}
