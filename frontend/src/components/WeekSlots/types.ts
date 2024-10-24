import { WeekSlotsModel } from "~/core/types";

export interface WeekSlotsProps {
    weekSlots: WeekSlotsModel;
    handleWeekSlotsChange: (weekSlots: WeekSlotsModel) => void;
}