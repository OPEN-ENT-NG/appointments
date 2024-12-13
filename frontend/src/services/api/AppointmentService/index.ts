import { emptySplitApi } from "../EmptySplitService";
import { TakeAppointmentPayload } from "./types";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    takeAppointment: builder.mutation<void, TakeAppointmentPayload>({
      query: ({ timeSlotId, isVisio }) => ({
        url: `/appointments/${timeSlotId}${
          isVisio !== undefined ? `?isVisio=${isVisio}` : ""
        }`,
        method: "POST",
      }),
    }),
  }),
});

export const { useTakeAppointmentMutation } = appointmentApi;
