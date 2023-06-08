import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { RootState } from "../store";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_API_URL + "/posts",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 30,
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    allPosts: builder.query<any, string>({
      query: () => `/`,
      keepUnusedDataFor: 30,
      providesTags: ["posts"],
    }),

    deleteOnePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
  refetchOnReconnect: true,
});

export const { useAllPostsQuery, useDeleteOnePostMutation } = postsApi;
