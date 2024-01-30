import TeamWorkspacePage from "./pages/workspace/TeamWorkspacePage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import MyPage from "./pages/MyPage/MyPage";
import IndexPage from "./pages/auth/IndexPage";
import ForeshadowingPage from "./pages/product/ForeshadowingPage";
import { BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import MyWorkspacePage from "./pages/workspace/MyWorkspacePage";
import CharPage from "./pages/product/CharPage";
import routes from "./routes/routes";



function App() {
  const {id} = useParams();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({path, component}) => {
          return(
            <Route key={path} path={path} element={component()} />
              
          );
        })}
        {/* <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/product/*" element={<ProductPage/>}></Route>
        <Route path="/product/char" element={<CharPage/>}></Route>
        <Route path="/foreshadowingpage" element={<ForeshadowingPage/>}></Route>
        <Route path="/mypage/*" element={<MyPage/>}></Route>
        <Route path="/workspace" element={<MyWorkspacePage/>}></Route>
        <Route path="/teamWorkspacepage/*" element={<TeamWorkspacePage/>}></Route> */}
      </Routes>
      {id}
    </BrowserRouter>
  );
}

export default App;
