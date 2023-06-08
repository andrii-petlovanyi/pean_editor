import { Middleware, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { galleryApi, postsApi, projectsApi } from "./api";
import authReducer from "./slice/user.slice";
import userApi from "./api/user.api";

const middlewares = [
  galleryApi.middleware,
  postsApi.middleware,
  projectsApi.middleware,
  userApi.middleware,
] as Middleware[];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
