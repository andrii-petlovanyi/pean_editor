import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { RootState } from "../store";
import {
  IProjectForm,
  IProjectResponse,
  IProjectsResponseList,
  IUpdateProject,
} from "../../types";

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
    allProjectsList: builder.query<IProjectsResponseList, null>({
      query: () => `/`,
      keepUnusedDataFor: 30,
      providesTags: ["projects"],
    }),

    getOneProjectBySlug: builder.query<IProjectResponse, string>({
      query: (slug) => `/${slug}`,
      keepUnusedDataFor: 30,
      providesTags: ["projects"],
    }),

    createProject: builder.mutation<IProjectResponse, IProjectForm>({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation<IProjectResponse, IUpdateProject>({
      query: (postData) => ({
        url: `/${postData.projectId}`,
        method: "PATCH",
        body: postData.formData,
      }),
      invalidatesTags: ["projects"],
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

export const {
  useAllProjectsListQuery,
  useDeleteOneProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetOneProjectBySlugQuery,
} = projectsApi;

export default projectsApi;
