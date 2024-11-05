import { emptySplitApi } from "./emptySplitApi.service";
import {
  GetMyGridsPayload,
  MyGridsResponse,
} from "~/providers/AvailabilityProvider/types";
import { GridPayload } from "~/providers/GridModalProvider/types";

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
      query: (body) => ({
        url: "/grids",
        params: body,
      }),
      providesTags: ["MyGrids"],
    }),
    getMyGridsName: builder.query<string[], void>({
      query: () => "/grids/names",
    }),
  }),
});

export const { useCreateGridMutation, useGetMyGridsQuery, useGetMyGridsNameQuery } = gridApi;
