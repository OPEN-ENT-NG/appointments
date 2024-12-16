import { emptySplitApi } from "../EmptySplitService";
import { TakeAppointmentPayload } from "./types";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    takeAppointment: builder.mutation<void, TakeAppointmentPayload>({
      query: ({ timeSlotId, isVideoCall }) => ({
        url: `/appointments/${timeSlotId}${
          isVideoCall !== undefined ? `?isVideoCall=${isVideoCall}` : ""
        }`,
        method: "POST",
      }),
      invalidatesTags: ["Availability"],
    }),
  }),
});

export const { useTakeAppointmentMutation } = appointmentApi;
