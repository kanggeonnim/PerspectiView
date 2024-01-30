import TeamWorkspacePage from "./pages/workspace/TeamWorkspacePage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import MyPage from "./pages/MyPage/MyPage";
import IndexPage from "./pages/auth/IndexPage";
import ForeshadowingPage from "./pages/product/ForeshadowingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyWorkspacePage from "./pages/workspace/MyWorkspacePage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/product/*" element={<ProductPage/>}></Route>
        <Route path="/foreshadowingpage" element={<ForeshadowingPage/>}></Route>
        <Route path="/mypage/*" element={<MyPage/>}></Route>
        <Route path="/workspace" element={<MyWorkspacePage/>}></Route>
        <Route path="/teamWorkspacepage/*" element={<TeamWorkspacePage/>}></Route>
=======
        {/* {routes.map(({ path, component }) => {
          return <Route key={path} path={path} element={<component/>} />;
        })} */}
        <Route path="/" element={<IndexPage/>}></Route>
          <Route path="login" element={<LoginPage/>}></Route>
          <Route path="product/*" element={<ProductPage/>}></Route>
          <Route path="product/char" element={<CharPage/>}></Route>
          <Route path="foreshadowingpage" element={<ForeshadowingPage/>}></Route>
          <Route path="mypage/*" element={<MyPage/>}></Route>
          <Route path="workspace/*" element={<MyWorkspacePage/>}></Route>
          <Route path="teamWorkspacepage/*" element={<TeamWorkspacePage/>}></Route>
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
