import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { RootState } from "../store";
import { User, UserResponse } from "../../types";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_API_URL + "/users",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    logInUser: builder.mutation<UserResponse, Partial<User>>({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),

    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),

    getUser: builder.query<User, User | undefined>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
  refetchOnReconnect: true,
});

export const { useLogInUserMutation, useLogOutUserMutation, useGetUserQuery } =
  userApi;

export default userApi;
