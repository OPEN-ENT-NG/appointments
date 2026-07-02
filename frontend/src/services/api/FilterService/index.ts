import { emptySplitApi } from "../EmptySplitService";
import { NameWithId } from "../GridService/types";
import { APPOINTMENT_FILTER_STATE, TagName } from "~/core/enums";

export const filterApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentFilterStates: builder.query<
      APPOINTMENT_FILTER_STATE[],
      void
    >({
      query: () => "/filters/appointments/states",
      providesTags: [TagName.APPOINTMENTS],
    }),
    getAppointmentFilterGrids: builder.query<NameWithId[], void>({
      query: () => "/filters/appointments/grids",
      providesTags: [TagName.APPOINTMENTS],
    }),
  }),
});

export const {
  useGetAppointmentFilterStatesQuery,
  useGetAppointmentFilterGridsQuery,
} = filterApi;
