import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";
import DefaultHeader from "./components/header/DefaultHeader";
import ProductHeader from "./components/header/ProductHeader";
import { LoginBox } from "./pages/auth/components/LoginBox";
import MyWorkspace from "./pages/workspace/MyWorkspace";
import TeamCreate from "./pages/workspace/TeamCreate";




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
        <MyWorkspace />
        <TeamCreate />
      </div>
      
    </>
  );
}

export default App;
