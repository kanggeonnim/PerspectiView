import MyPage from "@/pages/MyPage/MyPage";
import IndexPage from "@/pages/auth/IndexPage";
import LoginPage from "@/pages/auth/LoginPage";
import CharPage from "@/pages/product/CharPage";
import ForeshadowingPage from "@/pages/product/ForeshadowingPage";
import ProductPage from "@/pages/product/ProductPage";
import MyWorkspacePage from "@/pages/workspace/MyWorkspacePage";
import TeamWorkspacePage from "@/pages/workspace/TeamWorkspacePage";

export default [
  {
    path : "/",
    element: IndexPage
  },
  {
    path : "/login",
    element: LoginPage
  },
  {
    path : "/workspace/:id",
    element: MyWorkspacePage
  },
  {
    path : "/workspace/team/:id",
    element: TeamWorkspacePage
  },
  {
    path : "/product/:id",
    element: ProductPage
  },
  {
    path : "/product/:id/foreshadowingpage",
    element: ForeshadowingPage
  },
  {
    path : "/product/:id/charpage",
    element: CharPage
  },
  {
    path : "/users/:id",
    element: MyPage
  },


]