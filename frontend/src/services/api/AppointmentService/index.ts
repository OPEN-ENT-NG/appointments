import { TakeAppointmentPayload } from "./types";
import { emptySplitApi } from "../EmptySplitService";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    takeAppointment: builder.mutation<void, TakeAppointmentPayload>({
      query: ({ timeSlotId, isVisio }) => ({
        url: `/appointments/${timeSlotId}${
          isVisio !== undefined ? `?isVisio=${isVisio}` : ""
        }`,
        method: "POST",
      }),
      invalidatesTags: ["Availability"],
    }),
  }),
});

export const { useTakeAppointmentMutation } = appointmentApi;
