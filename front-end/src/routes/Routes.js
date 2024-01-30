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
    component: IndexPage
  },
  {
    path : "/login",
    component: LoginPage
  },
  {
    path : "/workspace/:id",
    component: MyWorkspacePage
  },
  {
    path : "/workspace/team/:id",
    component: TeamWorkspacePage
  },
  {
    path : "/product/:id",
    component: ProductPage
  },
  {
    path : "/product/:id/foreshadowingpage",
    component: ForeshadowingPage
  },
  {
    path : "/product/:id/charpage",
    component: CharPage
  },
  {
    path : "/users/:id",
    component: MyPage
  },


]