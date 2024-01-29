import MyPage from "@/pages/MyPage/MyPage";
import IndexPage from "@/pages/auth/IndexPage";
import LoginPage from "@/pages/auth/LoginPage";
import ProductPage from "@/pages/product/ProductPage";
import MyWorkspacePage from "@/pages/workspace/MyWorkspacePage";

export default [
  {
    path : "/",
    components: IndexPage
  },
  {
    path : "/login",
    components: LoginPage
  },
  {
    path : "/product",
    components: ProductPage
  },
  {
    path : "/workspace",
    components: MyWorkspacePage
  },
  {
    path : "/users/:id",
    components: MyPage
  },
  


]