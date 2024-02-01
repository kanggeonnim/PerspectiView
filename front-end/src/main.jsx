import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
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
import DragAndDrop from "./pages/product/components/foreshadowing/DragAndDrop.jsx";
import ForeshadowingTab from "./pages/product/components/foreshadowing/ForeshadowingTab.jsx";
import WorkspacePage from "./pages/workspace/WorkspacePage.jsx";
import TeamWorkspaceBody from "./pages/workspace/components/TeamWorkspaceBody.jsx";
import WorkListCard from "./pages/workspace/components/WorkListCard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "product/:productId/foreshadowing",
        element: <DragAndDrop />,
      },
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
            element: <WorkListCard />,
          },
          {
            path: "team/:teamId",
            element: <TeamWorkspaceBody />,
          },
        ],
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
        children: [
          {
            path: "",
            element: <Navigate replace to="character" />,
          },
          {
            path: "character",
            element: <CharTab />,
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
            path: "story/:storyId",
            element: <StoryInfo />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
