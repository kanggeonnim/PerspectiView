import ProductHeader from "./components/header/ProductHeader";
import UserSidebar from "./components/sidebar/UserSidebar";

import WorkspaceBody from "./pages/workspace/components/WorkspaceBody";

import LoginPage from "./pages/auth/LoginPage";

import ProductPage from "./pages/product/ProductPage";
import { PageLayout } from "./layouts/PageLayout";
import { Route, Routes } from "react-router-dom";
import CharDetailCard from "./pages/product/components/CharDetailCard";
import CharCreateCard from "./pages/product/components/CharCreateCard";
import { ForeshadowingCard } from "./components/card/ForeshadowingCard";

function App() {
  
  return (
    // <Routes>
    //   <Route path="/login" element={<LoginPage />}/>
    // </Routes>
    // <ProductPage />
    // <CharDetailCard/>
    <CharCreateCard />
    // <ForeshadowingCard />
  );
}

export default App;
