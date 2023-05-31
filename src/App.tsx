import { RouterProvider, createHashRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Blog, Comments, Gallery, Home, Projects, Settings } from "./screens";

let router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "gallery",
        Component: Gallery,
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "projects",
        Component: Projects,
      },
      {
        path: "comments",
        Component: Comments,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={false} />;
}

export default App;
