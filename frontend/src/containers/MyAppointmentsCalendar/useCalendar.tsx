import { useCallback, useMemo, useState } from "react";

import {
  buildCalendarFiltersFromPref,
  buildCalendarFiltersPref,
} from "./utils";
import { usePreferences } from "~/hooks/usePreferences";
import { FilterType } from "~/core/enums";
import { Filter, FilterItem } from "./types";
import { toast } from "react-toastify";
import { Box, Button } from "@cgi-learning-hub/ui";
import { t } from "~/i18n";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";
import { useGetAppointmentFilterGridsQuery, useGetAppointmentFilterStatesQuery } from "~/services/api/FilterService";

export const useCalendar = () => {
  const [calendarFilters, setCalendarFilters] = useState<Filter[]>([]);
  const { fetchCalendarFiltersPreference, updateCalendarFiltersPreference } =
    usePreferences();
  const nbCheckedFilters = calendarFilters.reduce((acc, filter) => {
    const checkedCount = filter.filters.filter(
      (filterItem) => filterItem.checked,
    ).length;
    return acc + checkedCount;
  }, 0);
  
  const { data: statusFiltersList } = useGetAppointmentFilterStatesQuery();
  const { data: gridFiltersList } = useGetAppointmentFilterGridsQuery();

  const initCalendarFilters = useCallback(async () => {
    const calendarFiltersPref = await fetchCalendarFiltersPreference();
    const calendarFilters = buildCalendarFiltersFromPref(
      calendarFiltersPref,
      statusFiltersList ?? [],
      gridFiltersList ?? [],
    );
    setCalendarFilters(calendarFilters);
  }, [fetchCalendarFiltersPreference, statusFiltersList, gridFiltersList]);

  const handleChangeCalendarFilters = useCallback(
    (newCalendarFilters: Filter[]) => {
      setCalendarFilters(newCalendarFilters);
      const newCalendarFiltersPref =
        buildCalendarFiltersPref(newCalendarFilters);
      updateCalendarFiltersPreference(newCalendarFiltersPref);
    },
    [updateCalendarFiltersPreference],
  );

  const handleClearAllFilters = useCallback(() => {
    const previousFilters = calendarFilters; // save temporary
    const newFilters = calendarFilters.map((filter) => ({
      ...filter,
      filters: filter.filters.map((f) => ({ ...f, checked: false })),
    }));
    handleChangeCalendarFilters(newFilters); // apply clearAll and save it in main state and preferences

    toast.success(
      <Box sx={spaceBetweenBoxStyle}>
        {t("appointments.filters.cleared")}
        <Button
          variant="outlined"
          onClick={() => handleChangeCalendarFilters(previousFilters)}
          sx={{ marginRight: "1rem" }}
        >
          {t("appointments.cancel")}
        </Button>
      </Box>,
    );
  }, [calendarFilters, handleChangeCalendarFilters]);

  const handleClearFilterType = useCallback(
    (filterType: FilterType) => {
      const newFilters = calendarFilters.map((filter) =>
        filter.type === filterType
          ? {
              ...filter,
              filters: filter.filters.map((f) => ({ ...f, checked: false })),
            }
          : filter,
      );
      handleChangeCalendarFilters(newFilters);
    },
    [calendarFilters, handleChangeCalendarFilters],
  );

  const handleCheckboxChange = useCallback(
    (filterItem: FilterItem) => {
      const newFilters = calendarFilters.map((filter) => {
        if (filter.filters.some((item) => item.id === filterItem.id)) {
          const updatedFilters = filter.filters.map((item) => {
            if (item.id === filterItem.id) {
              return { ...item, checked: !item.checked };
            }
            return item;
          });
          return { ...filter, filters: updatedFilters };
        }
        return filter;
      });

      handleChangeCalendarFilters(newFilters);
    },
    [calendarFilters, handleChangeCalendarFilters],
  );

  return useMemo(
    () => ({
      calendarFilters,
      nbCheckedFilters,
      initCalendarFilters,
      handleClearAllFilters,
      handleClearFilterType,
      handleCheckboxChange,
    }),
    [
      calendarFilters,
      nbCheckedFilters,
      initCalendarFilters,
      handleClearAllFilters,
      handleClearFilterType,
      handleCheckboxChange,
    ],
  );
};
