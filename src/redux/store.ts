import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slice/user.slice";
import userApi from "./api/user.api";
import galleryApi from "./api/gallery.api";
import postsApi from "./api/posts.api";
import projectsApi from "./api/projects.api";

const middleware = [
  ...getDefaultMiddleware({}),
  postsApi.middleware,
  projectsApi.middleware,
  userApi.middleware,
  galleryApi.middleware,
];

const reducers = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
