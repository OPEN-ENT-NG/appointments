import { TagName } from "~/core/enums";
import { emptySplitApi } from "../EmptySplitService";
import { transformGridsResponseToFilterItems, transformStatusResponseToFilterItems } from "./utils";
import { FilterItem } from "~/containers/MyAppointmentsCalendar/types";

export const filterApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentFilterStates: builder.query<FilterItem[], void>(
      {
        query: () => "/filters/appointments/states",
        providesTags: [TagName.APPOINTMENTS],
        transformResponse: transformStatusResponseToFilterItems,
      },
    ),
    getAppointmentFilterGrids: builder.query<FilterItem[], void>({
      query: () => "/filters/appointments/grids",
      providesTags: [TagName.APPOINTMENTS],
      transformResponse: transformGridsResponseToFilterItems,
    }),
  }),
});

export const {
  useGetAppointmentFilterStatesQuery,
  useGetAppointmentFilterGridsQuery,
} = filterApi;
