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
import persistedViewerReducer from "./persist.config";
import { persistStore } from "redux-persist";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  postsApi.middleware,
  projectsApi.middleware,
  userApi.middleware,
  galleryApi.middleware,
];

const reducers = combineReducers({
  auth: authReducer,
  viewer: persistedViewerReducer,
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
