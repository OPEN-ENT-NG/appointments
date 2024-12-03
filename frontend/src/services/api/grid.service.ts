import dayjs from "dayjs";

import { HexaColor } from "~/components/ColorPicker/types";
import { GRID_STATE } from "~/core/enums";
import {
  GetMyGridsPayload,
  MyGridsResponse,
} from "~/providers/AvailabilityProvider/types";
import { GridNameWithId } from "~/providers/FindAppointmentsProvider/types";
import { GridPayload } from "~/providers/GridModalProvider/types";
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
  }),
});

export const {
  useCreateGridMutation,
  useGetMyGridsQuery,
  useGetMyGridsNameQuery,
  useGetAvailableUserMinimalGridsQuery,
} = gridApi;
