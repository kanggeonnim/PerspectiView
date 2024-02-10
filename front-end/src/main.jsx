import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import App from "./App.jsx";
import "./index.css";

import ErrorPage from "./pages/ErrorPage.jsx";
import IndexPage from "./pages/auth/IndexPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import MyPage from "./pages/auth/MyPage.jsx";
import ProductPage from "./pages/product/ProductPage.jsx";
import CharTab from "./pages/product/components/character/CharTab.jsx";
import FlowTab from "./pages/product/components/flow/FlowTab.jsx";
import StoryInfo from "./pages/product/components/flow/story/StoryInfo.jsx";
import { default as ForeshadowingTab } from "./pages/product/components/foreshadowing/ForeshadowingTab.jsx";
import WorkspacePage from "./pages/workspace/WorkspacePage.jsx";
import ProductListCard from "./pages/workspace/components/ProductListCard.jsx";
import TeamInfo from "./pages/workspace/components/TeamInfo.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      ),
      errorElement: <ErrorPage />,

      children: [
        {
          path: "",
          element: <IndexPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "settings/profile",
          element: <MyPage />,
        },
        {
          path: "workspace",
          element: <WorkspacePage />,
          children: [
            {
              path: "",
              element: <ProductListCard />,
            },
            {
              path: "team/:teamId",
              element: <TeamInfo />,
            },
          ],
        },
        {
          path: "team/:teamId/product/:productId",
          element: <ProductPage />,
          children: [
            {
              path: "",
              element: <Navigate replace to="character" />,
            },
            {
              path: "character",
              element: <CharTab onId />,
            },
            {
              path: "foreshadowing",
              element: <ForeshadowingTab />,
            },
            {
              path: "flow",
              element: <FlowTab />,
            },
            {
              path: "plot/:plotId/story/:storyId",
              element: <StoryInfo />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/app",
  }
);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  // </React.StrictMode>
);
