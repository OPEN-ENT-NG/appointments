import { SvgIconComponent } from "@mui/icons-material";

export interface StyledHeaderProps {
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
