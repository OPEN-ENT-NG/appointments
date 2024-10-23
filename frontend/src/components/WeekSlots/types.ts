import { WeekSlotsModel } from "~/core/types";

export interface WeekSlotsProps {
    weekSlots: WeekSlotsModel;
    setWeekSlots: (weekSlots: WeekSlotsModel) => void;
}