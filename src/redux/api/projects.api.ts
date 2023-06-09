import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { RootState } from "../store";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_API_URL + "/projects",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  keepUnusedDataFor: 30,
  tagTypes: ["projects"],

  endpoints: (builder) => ({
    allProjectsList: builder.query<any, null>({
      query: () => `/`,
      keepUnusedDataFor: 30,
      providesTags: ["projects"],
    }),

    deleteOneProject: builder.mutation<any, string>({
      query: (todoId) => ({
        url: `/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
  refetchOnReconnect: true,
});

export const { useAllProjectsListQuery, useDeleteOneProjectMutation } =
  projectsApi;

export default projectsApi;
