import { Dayjs } from "dayjs";

import { emptySplitApi } from "../EmptySplitService";
import {
  Appointment,
  BookAppointmentPayload,
  GetAppointmentsDatesPayload,
  GetMyAppointmentsPayload,
  MyAppointments,
} from "./types";
import {
  transformResponseToAppointment,
  transformResponseToDayjsArray,
  transformResponseToMyAppointments,
  transformResponseToNumber,
} from "./utils";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<void, BookAppointmentPayload>({
      query: ({ timeSlotId, isVideoCall }) => ({
        url: `/appointments/${timeSlotId}`,
        method: "POST",
        params: isVideoCall !== undefined ? { isVideoCall } : undefined,
      }),
      invalidatesTags: ["Availability", "MyAppointments"],
    }),
    getMyAppointments: builder.query<MyAppointments, GetMyAppointmentsPayload>({
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
      providesTags: ["MyAppointments"],
    }),
    getAppointment: builder.query<Appointment, number>({
      query: (appointmentId) => `/appointments/${appointmentId}`,
      transformResponse: transformResponseToAppointment,
      providesTags: ["MyAppointments"],
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
      providesTags: ["MyAppointments"],
    }),
    getAvailableAppointments: builder.query<Appointment[], number>({
      query: (gridId) => `/appointments/available/grids/${gridId}`,
    }),
    acceptAppointment: builder.mutation<void, number>({
      query: (appointmentId) => ({
        url: `/appointments/${appointmentId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: ["MyAppointments"],
    }),
    rejectAppointment: builder.mutation<void, number>({
      query: (appointmentId) => ({
        url: `/appointments/${appointmentId}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["MyAppointments"],
    }),
    cancelAppointment: builder.mutation<void, number>({
      query: (appointmentId) => ({
        url: `/appointments/${appointmentId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["MyAppointments"],
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
} = appointmentApi;
