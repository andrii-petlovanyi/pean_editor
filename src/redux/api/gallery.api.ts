import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import {
  IAlbum,
  ICreateAlbum,
  ICreateGalleryFolder,
  ICreateResponse,
  IDeleteResponse,
  IGalleryFolder,
  IUpdateAlbum,
  IUpdateGalleryFolder,
  IUpdateResponse,
} from "../../types";
import { RootState } from "../store";

const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_API_URL + "/gallery",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  keepUnusedDataFor: 30,
  tagTypes: ["gallery", "albums"],

  endpoints: (builder) => ({
    getAllGalleryFolders: builder.query<Omit<IGalleryFolder, "albums">[], null>(
      {
        query: () => `/`,
        keepUnusedDataFor: 30,
        providesTags: ["gallery"],
      }
    ),

    getOneGalleryFolder: builder.query<IGalleryFolder, string>({
      query: (folderId) => `/${folderId}`,
      keepUnusedDataFor: 30,
      providesTags: ["gallery"],
    }),

    createOneGalleryFolder: builder.mutation<
      Pick<IGalleryFolder, "folderName">,
      ICreateGalleryFolder
    >({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data.formData,
      }),
      invalidatesTags: ["gallery"],
    }),

    deleteOneGalleryFolder: builder.mutation<IDeleteResponse, string>({
      query: (folderId) => ({
        url: `/${folderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),

    updateOneGalleryFolder: builder.mutation<
      IUpdateResponse,
      IUpdateGalleryFolder
    >({
      query: (folderData) => ({
        url: `/${folderData.folderId}`,
        method: "PATCH",
        body: folderData.formData,
      }),
      invalidatesTags: ["gallery"],
    }),

    getOneAlbum: builder.query<IAlbum, string>({
      query: (albumId) => `/album/${albumId}`,
      keepUnusedDataFor: 30,
      providesTags: ["albums"],
    }),

    createOneAlbum: builder.mutation<ICreateResponse, ICreateAlbum>({
      query: (albumData) => ({
        url: `/${albumData.folderId}/album`,
        method: "POST",
        body: albumData.formData,
      }),
      invalidatesTags: ["albums", "gallery"],
    }),

    updateOneAlbum: builder.mutation<IUpdateResponse, IUpdateAlbum>({
      query: (albumData) => ({
        url: `/album/${albumData.albumId}`,
        method: "PATCH",
        body: albumData.formData,
      }),
      invalidatesTags: ["albums", "gallery"],
    }),

    deleteOneAlbum: builder.mutation<IDeleteResponse, string>({
      query: (albumId) => ({
        url: `/album/${albumId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["albums", "gallery"],
    }),
  }),

  refetchOnReconnect: true,
});

export const {
  useGetAllGalleryFoldersQuery,
  usePrefetch,
  useGetOneAlbumQuery,
  useGetOneGalleryFolderQuery,
  useCreateOneAlbumMutation,
  useCreateOneGalleryFolderMutation,
  useUpdateOneAlbumMutation,
  useUpdateOneGalleryFolderMutation,
  useDeleteOneAlbumMutation,
  useDeleteOneGalleryFolderMutation,
} = galleryApi;

export default galleryApi;
