import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import viewerReducer from "./slice/viewer.slice";

const viewerPersistConfig = {
  key: "viewer",
  storage: storage,
};

const persistedViewerReducer = persistReducer(
  viewerPersistConfig,
  viewerReducer
);

export default persistedViewerReducer;
