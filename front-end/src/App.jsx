import TeamWorkspacePage from "./pages/workspace/TeamWorkspacePage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import MyPage from "./pages/MyPage/MyPage";
import IndexPage from "./pages/auth/IndexPage";
import MyWorkspacePage from "./pages/workspace/MyWorkspacePage";
import ForeshadowingPage from "./pages/product/ForeshadowingPage";

function App() {
  return (
    <>
      <LoginPage />

      <ProductPage />

      {/* <WorkspaceBody word="내 워크스페이스" works={works} /> */}
      <MyWorkspacePage />
      {/* <TeamCreate /> */}
      <MyPage />
      <IndexPage />
      <TeamWorkspacePage />
      <ForeshadowingPage />
    </>
  );
}

export default App;
