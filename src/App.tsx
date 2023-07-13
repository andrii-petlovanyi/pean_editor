import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Album,
  Blog,
  Comments,
  Gallery,
  GalleryFolder,
  Home,
  Login,
  PostEditor,
  Projects,
  Settings,
} from "./screens";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "./layout/Layout";
import ProtectedRoute from "./components/layout/Routes/ProtectedRoute";
import PublicRoute from "./components/layout/Routes/PublicRoute";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { constants } from "./constants/constants";
import { RootState } from "./redux/store";
import { useGetUserQuery } from "./redux/api/user.api";

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { setIsExpired, setToken } = useLocalStorage(constants.ACCESS_TOKEN);

  const { data, error } = useGetUserQuery(undefined, {
    skip: accessToken === null,
  });

  useEffect(() => {
    if (data) {
      setToken(data.token!);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsExpired(true);
    }
  }, [error]);

  return (
    <AnimatePresence mode={"wait"}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:folderId" element={<GalleryFolder />} />
            <Route path="gallery/:folderId/:albumId" element={<Album />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/editor" element={<PostEditor />} />
            <Route path="projects" element={<Projects />} />
            <Route path="comments" element={<Comments />} />
            <Route path="settings" element={<Settings />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
