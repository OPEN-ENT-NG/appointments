import { SvgIconComponent } from "@mui/icons-material";
import { ReactNode } from "react";
import { APPOINTMENT_FILTER_STATE, FilterType } from "~/core/enums";

export interface StyledHeaderProps {
  isMobile: boolean;
}

export interface StyledNavigationProps {
  isMobile: boolean;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    comment: string;
    colors: EventColors;
    IconComponent: SvgIconComponent;
  };
}

export interface EventColors {
  background: string;
  border: string;
  icon: string;
}

export interface Filter {
  type: FilterType;
  filters: FilterItem[];
}

export interface FilterItem {
  id: number | APPOINTMENT_FILTER_STATE;
  name: string;
  IconComponent: ReactNode;
  checked?: boolean;
}

export interface FilterPref {
  type: FilterType;
  filters: (number | APPOINTMENT_FILTER_STATE)[];
}
