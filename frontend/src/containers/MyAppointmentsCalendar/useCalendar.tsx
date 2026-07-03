import { useCallback, useMemo, useState } from "react";

import {
  buildCalendarFiltersFromPref,
  buildCalendarFiltersPref,
  FILTER_STATUS_I18N,
} from "./utils";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { usePreferences } from "~/hooks/usePreferences";
import { FilterType } from "~/core/enums";
import { Filter, FilterItem } from "./types";
import { toast } from "react-toastify";
import { Box, Button } from "@cgi-learning-hub/ui";
import { t } from "~/i18n";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles";

//TODO: delete from here
const statusFiltersList = [
  {
    id: 1,
    name: FILTER_STATUS_I18N["ACCEPTED"], //TODO: use enum from Niko instead (for all lines)
    IconComponent: <CheckCircleRoundedIcon sx={{ color: "success.main" }} />,
  },
  {
    id: 2,
    name: FILTER_STATUS_I18N["REFUSED"],
    IconComponent: <DoNotDisturbOnRoundedIcon sx={{ color: "error.main" }} />,
  },
  {
    id: 3,
    name: FILTER_STATUS_I18N["CANCELED"],
    IconComponent: <CancelRoundedIcon sx={{ color: "error.main" }} />,
  },
  {
    id: 4,
    name: FILTER_STATUS_I18N["CREATED_REQUESTER"],
    IconComponent: <HelpRoundedIcon sx={{ color: "warning.main" }} />,
  },
  {
    id: 5,
    name: FILTER_STATUS_I18N["CREATED_RECIPIENT"],
    IconComponent: <WarningRoundedIcon sx={{ color: "warning.main" }} />,
  },
];

const gridFiltersListSample = [
  {
    id: 42,
    name: "Rendez-vous ponctuels",
    IconComponent: <CircleRoundedIcon sx={{ color: "#9B59B6" }} />,
  },
  {
    id: 43,
    name: "Aide aux devoirs",
    IconComponent: <CircleRoundedIcon sx={{ color: "#2ECC71" }} />,
  },
  {
    id: 44,
    name: "Distribution de matériel",
    IconComponent: <CircleRoundedIcon sx={{ color: "#E74C3C" }} />,
  },
];
//TODO: to here

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

  const initCalendarFilters = useCallback(async () => {
    const calendarFiltersPref = await fetchCalendarFiltersPreference();
    //TODO: get statusFiltersList & gridFiltersList from API instead of sample above
    const calendarFilters = buildCalendarFiltersFromPref(
      calendarFiltersPref,
      statusFiltersList,
      gridFiltersListSample,
    );
    setCalendarFilters(calendarFilters);
  }, [fetchCalendarFiltersPreference]);

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
