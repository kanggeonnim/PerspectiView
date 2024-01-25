import { LoginBox } from "./pages/auth/components/LoginBox";
import { KakaoButton } from "./components/button/KakaoButton";
import { GoogleButton } from "./components/button/GoogleButton";

function App() {
  return (
    <LoginBox>
      <GoogleButton/>
      <KakaoButton/>
    </LoginBox>
    
  );
}

export default App;
