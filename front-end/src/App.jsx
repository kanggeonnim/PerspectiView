import DefaultHeader from "./components/header/DefaultHeader";
import ProductHeader from "./components/header/ProductHeader";
import { LoginBox } from "./pages/auth/components/LoginBox";
import { KakaoButton } from "./components/button/KakaoButton";
import { GoogleButton } from "./components/button/GoogleButton";

function App() {
  return (
    <>
      <div>
        <DefaultHeader />
        <ProductHeader />
        <LoginBox>
          <GoogleButton />
          <KakaoButton />
        </LoginBox>
      </div>
    </>
  );
}
export default App;
