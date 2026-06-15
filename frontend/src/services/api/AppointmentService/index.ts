import { Dayjs } from "dayjs";

import { emptySplitApi } from "../EmptySplitService";
import {
  Appointment,
  BookAppointmentPayload,
  GetAppointmentsDatesPayload,
  GetMyAppointmentsByDatesPayload,
  GetMyAppointmentsPayload,
  MyAppointments,
} from "./types";
import {
  transformResponseToAppointment,
  transformResponseToDayjsArray,
  transformResponseToMyAppointments,
  transformResponseToNumber,
} from "./utils";
import { APPOINTMENT_STATE, TagName } from "~/core/enums";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<void, BookAppointmentPayload>({
      query: ({ timeSlotId, isVideoCall }) => ({
        url: `/appointments/${timeSlotId}`,
        method: "POST",
        params: isVideoCall !== undefined ? { isVideoCall } : undefined,
      }),
      invalidatesTags: [
        TagName.AVAILABILITY,
        TagName.APPOINTMENTS,
        TagName.APPOINTMENTS_LINKED_TO_GRID,
      ],
    }),
    getMyAppointments: builder.query<
      MyAppointments,
      GetMyAppointmentsPayload | GetMyAppointmentsByDatesPayload
    >({
      query: (body) => {
        const statesString = JSON.stringify(body.states);
        return {
          url: "/appointments",
          params: {
            ...body,
            states: statesString,
          },
        };
      },
      transformResponse: transformResponseToMyAppointments,
      providesTags: [TagName.APPOINTMENTS],
    }),
    getAppointment: builder.query<Appointment, number>({
      query: (appointmentId) => `/appointments/${appointmentId}`,
      transformResponse: transformResponseToAppointment,
      providesTags: [TagName.APPOINTMENTS],
    }),
    getAppointmentIndex: builder.query<number, number>({
      query: (appointmentId) => `/appointments/${appointmentId}/index`,
      transformResponse: transformResponseToNumber,
    }),
    getAppointmentsDates: builder.query<Dayjs[], GetAppointmentsDatesPayload>({
      query: (body) => {
        const statesString = JSON.stringify(body.states);
        return {
          url: "/appointments/dates",
          params: {
            ...body,
            states: statesString,
          },
        };
      },
      transformResponse: transformResponseToDayjsArray,
      providesTags: [TagName.APPOINTMENTS],
    }),
    getAvailableAppointments: builder.query<Appointment[], number>({
      query: (gridId) => `/appointments/available/grids/${gridId}`,
      providesTags: [TagName.APPOINTMENTS_LINKED_TO_GRID],
    }),
    acceptAppointment: builder.mutation<void, number>({
      query: (appointmentId) => ({
        url: `/appointments/${appointmentId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: [TagName.APPOINTMENTS],
    }),
    rejectAppointment: builder.mutation<void, { id: number; comment?: string }>(
      {
        query: ({ id: appointmentId, comment }) => ({
          url: `/appointments/${appointmentId}/reject`,
          body: { comment },
          method: "PUT",
        }),
        invalidatesTags: [
          TagName.APPOINTMENTS,
          TagName.APPOINTMENTS_LINKED_TO_GRID,
        ],
      },
    ),
    cancelAppointment: builder.mutation<void, { id: number; comment?: string }>(
      {
        query: ({ id: appointmentId, comment }) => ({
          url: `/appointments/${appointmentId}/cancel`,
          body: { comment },
          method: "PUT",
        }),
        invalidatesTags: [
          TagName.APPOINTMENTS,
          TagName.APPOINTMENTS_LINKED_TO_GRID,
        ],
      },
    ),
    exportAppointmentsEvent: builder.mutation<
      { text: string; filename: string },
      { appointmentsIds: number[]; states: APPOINTMENT_STATE[] }
    >({
      query: ({ appointmentsIds, states }) => ({
        url: `/appointments/export/event`,
        body: { appointmentsIds, states },
        method: "POST",
        responseHandler: async (response: any) => {
          const filename =
            response.headers
              .get("Content-Disposition")
              ?.split("filename=")[1] ?? "calendar.ics";
          const text = await response.text();
          return { text, filename };
        },
      }),
    }),
  }),
});

export const {
  useBookAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAppointmentQuery,
  useGetAppointmentIndexQuery,
  useGetAppointmentsDatesQuery,
  useGetAvailableAppointmentsQuery,
  useAcceptAppointmentMutation,
  useRejectAppointmentMutation,
  useCancelAppointmentMutation,
  useExportAppointmentsEventMutation,
} = appointmentApi;
