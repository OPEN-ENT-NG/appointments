import { Slot } from "~/core/types";

export interface DailySlotProps {
    slot: Slot;
    setSlot: (slot: Slot) => void;
    handleDelete: () => void;
}