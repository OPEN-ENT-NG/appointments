import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const delayBaseQuery = async (args: any, api: any, extraOptions: any) => {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return fetchBaseQuery({
    baseUrl: "/appointments/",
    prepareHeaders: (headers) => {
      const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (xsrfToken) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));
      }

      return headers;
    },
  })(args, api, extraOptions);
};

export const emptySplitApi = createApi({
  baseQuery: delayBaseQuery,
  tagTypes: [
    "MyGrids",
    "Availability",
    "MyAppointments",
    "AppointmentsLinkedToGrid",
  ],
  endpoints: () => ({}),
});
