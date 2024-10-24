import { Slot } from "~/core/types";

export interface DailySlotProps {
    slot: Slot;
    handleDelete: () => void;
}