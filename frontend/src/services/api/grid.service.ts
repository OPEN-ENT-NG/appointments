import dayjs from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_STATE } from "~/core/enums";
import {
  GetMyGridsPayload,
  MyGridsResponse,
} from "~/providers/AvailabilityProvider/types";
import { GridPayload } from "~/providers/GridModalProvider/types";
import {
  GridInfos,
  GridNameWithId,
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
          slotDuration: response.duration,
          visio: !!response.visioLink,
          place: response.place,
          publicComment: response.public_comment,
          documentId: response.document_id,
        };
      },
    }),
  }),
});

export const {
  useCreateGridMutation,
  useGetMyGridsQuery,
  useGetMyGridsNameQuery,
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
} = gridApi;
