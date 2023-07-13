import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { RootState } from "../store";
import {
  IPostForm,
  IPostResponse,
  IPostResponseList,
  IPostUpdate,
} from "../../types/posts.interface";

const postsApi = createApi({
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
    allPosts: builder.query<IPostResponseList, null>({
      query: () => `/dashboard`,
      keepUnusedDataFor: 30,
      providesTags: ["posts"],
    }),

    createPost: builder.mutation<IPostResponse, IPostForm>({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["posts"],
    }),

    updatePost: builder.mutation<IPostResponse, IPostUpdate>({
      query: (postData) => ({
        url: `/${postData.postId}`,
        method: "PATCH",
        body: postData.formData,
      }),
      invalidatesTags: ["posts"],
    }),

    deleteOnePost: builder.mutation<IPostResponse, string>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),

  refetchOnReconnect: true,
});

export const {
  useAllPostsQuery,
  useCreatePostMutation,
  useDeleteOnePostMutation,
} = postsApi;

export default postsApi;
