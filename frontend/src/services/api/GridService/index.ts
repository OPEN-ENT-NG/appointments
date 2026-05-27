import { GridModalInputs } from "~/providers/GridModalProvider/types";
import { emptySplitApi } from "../EmptySplitService";
import {
  CreateGridPayload,
  EditGridPayload,
  GetMyGridsPayload,
  GetTimeSlotsPayload,
  GridInfos,
  IGridOwnerInfosProps,
  MyGrids,
  NameWithId,
  TimeSlots,
  UpdateGridStatePayload,
} from "./types";
import {
  transformResponseToCompleteGridResponse,
  transformResponseToGridInfosResponse,
  transformResponseToMyGridsResponse,
} from "./utils";
import { t } from "~/i18n";
import { toast } from "react-toastify";
import { TagName } from "~/core/enums";

export const gridApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createGrid: builder.mutation({
      query: (body: CreateGridPayload) => ({
        url: "/grids",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagName.GRIDS, TagName.AVAILABILITY],
    }),
    getGridById: builder.query<GridModalInputs, number>({
      query: (gridId) => `/grids/${gridId}`,
      transformResponse: transformResponseToCompleteGridResponse,
      providesTags: [TagName.GRIDS],
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
      providesTags: [TagName.GRIDS],
    }),
    getMyGridsName: builder.query<string[], void>({
      query: () => "/grids/names",
      providesTags: [TagName.GRIDS],
    }),
    getAvailableUserMinimalGrids: builder.query<NameWithId[], string>({
      query: (userId) => `/users/${userId}/grids/minimal`,
      providesTags: [TagName.AVAILABILITY],
    }),
    getMinimalGridInfosById: builder.query<GridInfos, number>({
      query: (gridId) => `/grids/${gridId}/minimal/infos`,
      transformResponse: transformResponseToGridInfosResponse,
      providesTags: [TagName.AVAILABILITY],
    }),
    getTimeSlotsByGridIdAndDate: builder.query<TimeSlots, GetTimeSlotsPayload>({
      query: ({ gridId, beginDate, endDate }) => ({
        url: `/grids/${gridId}/timeslots`,
        params: {
          beginDate: beginDate,
          endDate: endDate,
        },
      }),
      providesTags: [TagName.AVAILABILITY],
    }),
    getGridOwnerInfos: builder.query<IGridOwnerInfosProps, number>({
      query: (gridId) => `/grids/${gridId}/owner`,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("appointments.toast.grid.link.404.error", err);
          toast.error(t("appointments.toast.grid.link.404.error"));
        }
      },
    }),
    deleteGrid: builder.mutation<void, UpdateGridStatePayload>({
      query: ({ gridId, deleteAppointments }) => ({
        url: `/grids/${gridId}/delete`,
        method: "PUT",
        params: { deleteAppointments },
      }),
      invalidatesTags: [
        TagName.GRIDS,
        TagName.AVAILABILITY,
        TagName.APPOINTMENTS,
      ],
    }),
    suspendGrid: builder.mutation<void, UpdateGridStatePayload>({
      query: ({ gridId, deleteAppointments }) => ({
        url: `/grids/${gridId}/suspend`,
        method: "PUT",
        params: { deleteAppointments },
      }),
      invalidatesTags: [
        TagName.GRIDS,
        TagName.AVAILABILITY,
        TagName.APPOINTMENTS,
      ],
    }),
    restoreGrid: builder.mutation({
      query: ({ gridId }) => ({
        url: `/grids/${gridId}/restore`,
        method: "PUT",
      }),
      invalidatesTags: [TagName.GRIDS, TagName.AVAILABILITY],
    }),
    editGrid: builder.mutation<void, EditGridPayload>({
      query: ({ gridId, body }) => ({
        url: `/grids/${gridId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        TagName.GRIDS,
        TagName.AVAILABILITY,
        TagName.APPOINTMENTS,
      ],
    }),
  }),
});

export const {
  useCreateGridMutation,
  useGetGridByIdQuery,
  useGetMyGridsQuery,
  useGetMyGridsNameQuery,
  useGetAvailableUserMinimalGridsQuery,
  useGetMinimalGridInfosByIdQuery,
  useGetTimeSlotsByGridIdAndDateQuery,
  useGetGridOwnerInfosQuery,
  useDeleteGridMutation,
  useSuspendGridMutation,
  useRestoreGridMutation,
  useEditGridMutation,
} = gridApi;
