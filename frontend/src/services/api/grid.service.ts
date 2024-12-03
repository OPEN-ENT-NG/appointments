import dayjs from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_STATE } from "~/core/enums";
import { parseStringToSlotDuration } from "~/core/utils/date.utils";
import {
  GetMyGridsPayload,
  MyGridsResponse,
} from "~/providers/AvailabilityProvider/types";
import { GridPayload } from "~/providers/GridModalProvider/types";
import {
  GetTimeSlotPayload,
  GridInfos,
  GridNameWithId,
  TimeSlots,
} from "~/providers/TakeAppointmentModalProvider/types";
import { emptySplitApi } from "./emptySplitApi.service";

export const gridApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createGrid: builder.mutation({
      query: (body: GridPayload) => ({
        url: "/grids",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyGrids"],
    }),
    getMyGrids: builder.query<MyGridsResponse, GetMyGridsPayload>({
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
      transformResponse: (response: any) => {
        return {
          total: response.total,
          grids: response.minimal_creator_grids.map((grid: any) => ({
            id: grid.id.toString(),
            name: grid.name,
            color: grid.color as HexaColor,
            beginDate: dayjs(grid.begin_date),
            endDate: dayjs(grid.end_date),
            state: grid.state as GRID_STATE,
            structureId: grid.structure_id.toString(),
          })),
        };
      },
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
