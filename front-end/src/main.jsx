import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage.jsx";
import IndexPage from "./pages/auth/IndexPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProductPage from "./pages/product/ProductPage.jsx";
import CharTab from "./pages/product/components/character/CharTab.jsx";
import ForeshadowingTab from "./pages/product/components/foreshadowing/ForeshadowingTab.jsx";
import StoryInfo from "./pages/product/components/flow/story/StoryInfo.jsx";
import MyPage from "./pages/auth/MyPage.jsx";
import FlowTab from "./pages/product/components/flow/FlowTab.jsx";
import WorkspacePage from "./pages/workspace/WorkspacePage.jsx";
import ProductListCard from "./pages/workspace/components/ProductListCard.jsx";
import TeamInfo from "./pages/workspace/components/TeamInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
