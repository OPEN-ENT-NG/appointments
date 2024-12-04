import { parseStringToSlotDuration } from "~/core/utils/date.utils";
import {
  GetTimeSlotPayload,
  GridInfos,
  TimeSlots,
} from "~/providers/TakeAppointmentModalProvider/types";
import { emptySplitApi } from "../EmptySplitService";
import {
  CreateGridPayload,
  GetMyGridsPayload,
  GridNameWithId,
  MyGrids,
} from "./types";
import { transformResponseToMyGridsResponse } from "./utils";

export const gridApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createGrid: builder.mutation({
      query: (body: CreateGridPayload) => ({
        url: "/grids",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyGrids"],
    }),
    getMyGrids: builder.query<MyGrids, GetMyGridsPayload>({
      query: (body) => {
        const statesString = JSON.stringify(body.states);
        return {
          url: "/grids",
          params: {
            ...body,
            states: statesString,
          },
        };
      },
      transformResponse: transformResponseToMyGridsResponse,
      providesTags: ["MyGrids"],
    }),
    getMyGridsName: builder.query<string[], void>({
      query: () => "/grids/names",
    }),
    getAvailableUserMinimalGrids: builder.query<GridNameWithId[], string>({
      query: (userId) => `/users/${userId}/grids/minimal`,
    }),
    getMinimalGridInfosById: builder.query<GridInfos, number>({
      query: (gridId) => `/grids/${gridId}/minimal/infos`,
      transformResponse: (response: any) => {
        return {
          slotDuration: parseStringToSlotDuration(response.duration),
          visio: !!response.visioLink,
          place: response.place,
          publicComment: response.publicComment,
          documentId: response.documentId,
        };
      },
    }),
    getTimeSlotsByGridIdAndDate: builder.query<TimeSlots, GetTimeSlotPayload>({
      query: (params) => ({
        url: `/grids/${params.gridId}/timeslots`,
        params: {
          beginDate: params.beginDate,
          endDate: params.endDate,
        },
      }),
    }),
  }),
});

export const {
  useCreateGridMutation,
  useGetMyGridsQuery,
  useGetMyGridsNameQuery,
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
} = gridApi;
