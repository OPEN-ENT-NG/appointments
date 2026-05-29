import { NUMBER_MORE_USERS } from "~/providers/FindAppointmentsProvider/utils";
import { emptySplitApi } from "../EmptySplitService";
import { GetUsersPayload, UserCardInfos } from "./types";
import { TagName } from "~/core/enums";

export const communicationApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunicationUsers: builder.infiniteQuery<
      UserCardInfos[],
      GetUsersPayload,
      number
    >({
      query: ({ queryArg, pageParam }) => ({
        url: "/communication/to/users",
        params: {
          search: queryArg.search,
          limit: queryArg.limit,
          page: pageParam,
        },
      }),

      infiniteQueryOptions: {
        initialPageParam: 1,

        getNextPageParam: (lastPage, _, lastPageParam) => {
          if (lastPage.length < NUMBER_MORE_USERS) return undefined;

          return lastPageParam + 1;
        },
      },

      providesTags: [TagName.AVAILABILITY],
    }),
  }),
});

export const { useGetCommunicationUsersInfiniteQuery } = communicationApi;
