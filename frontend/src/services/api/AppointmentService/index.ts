import { emptySplitApi } from "../EmptySplitService";

export const appointmentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    takeAppointment: builder.mutation<void, number>({
      query: (timeSlotId) => ({
        url: `/appointments/${timeSlotId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useTakeAppointmentMutation } = appointmentApi;
