import { DailySlot } from "~/core/types";

export interface DailySlotProps {
    dailySlot: DailySlot;
    handleDelete: () => void;
}