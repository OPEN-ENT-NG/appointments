import { odeServices } from "@edifice.io/client";
import { useCallback } from "react";
import { ViewMode } from "~/components/SwitchView/enums";
import { FilterPref } from "~/containers/MyAppointmentsCalendar/types";
import { getDefaultCalendarFiltersPref } from "~/containers/MyAppointmentsCalendar/utils";
import { APPOINTMENTS } from "~/core/constants";

export const usePreferences = () => {
  const getAppointmentsPreference = useCallback(async () => {
    try {
      const result: { [key: string]: string } = await odeServices
        .conf()
        .getPreference(APPOINTMENTS);
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }, []);

  const getAppointmentsPreferenceByKey = useCallback(
    async (prefKey: string) => {
      try {
        const result: { [key: string]: string } = await odeServices
          .conf()
          .getPreference(APPOINTMENTS);
        return result[prefKey];
      } catch (error) {
        console.error("An error occurred:", error);
        throw error;
      }
    },
    [],
  );

  const fetchViewModePreference = useCallback(async () => {
    try {
      const viewModePref =
        await getAppointmentsPreferenceByKey("viewModePreference");
      return viewModePref as ViewMode;
    } catch (error) {
      console.error("ViewMode fetch request Error", error);
      return ViewMode.GRID;
    }
  }, [getAppointmentsPreferenceByKey]);

  const fetchCalendarFiltersPreference = useCallback(async () => {
    try {
      const calendarFiltersPref = await getAppointmentsPreferenceByKey(
        "calendarFiltersPreference",
      );
      return calendarFiltersPref
        ? (JSON.parse(calendarFiltersPref) as FilterPref[])
        : getDefaultCalendarFiltersPref();
    } catch (error) {
      console.error("CalendarFilters fetch request Error", error);
      return getDefaultCalendarFiltersPref();
    }
  }, [getAppointmentsPreferenceByKey]);

  const savePreferenceByKey = useCallback(
    async (key: string, value: string | number | boolean) => {
      const currentPreferences = await getAppointmentsPreference();
      const result = await odeServices
        .conf()
        .savePreference(
          APPOINTMENTS,
          JSON.stringify({ ...currentPreferences, [key]: value }),
        );
      return result;
    },
    [getAppointmentsPreference],
  );

  const updateViewModePreference = useCallback(
    async (newViewMode: ViewMode) => {
      try {
        await savePreferenceByKey("viewModePreference", newViewMode);
      } catch (error) {
        console.error("ViewMode update request Error", error);
      }
    },
    [savePreferenceByKey],
  );

  const updateCalendarFiltersPreference = useCallback(
    async (newFiltersPref: FilterPref[]) => {
      try {
        await savePreferenceByKey(
          "calendarFiltersPreference",
          JSON.stringify(newFiltersPref),
        );
      } catch (error) {
        console.error("CalendarFilters update request Error", error);
      }
    },
    [savePreferenceByKey],
  );

  return {
    fetchViewModePreference,
    updateViewModePreference,
    fetchCalendarFiltersPreference,
    updateCalendarFiltersPreference,
  };
};
