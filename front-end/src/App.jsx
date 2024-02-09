import { Outlet } from "react-router-dom";
import ProductDetail from "./pages/workspace/components/ProductDetail";
import ProductEdit from "./pages/workspace/components/ProductEdit";
function App() {
  return (
    <>
      <Outlet />
      {/* <ProductDetail isDetail={true} /> */}
      {/* <ProductEdit /> */}
    </>
  );
}

export default App;
