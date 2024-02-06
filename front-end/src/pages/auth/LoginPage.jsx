import { MainLayout } from "@/layouts/MainLayout";
import { Link } from "react-router-dom";
import { LoginBox } from "./components/LoginBox";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // const navigate = useNavigate();
    // const width = 600,
    //   height = 600; // 팝업 창의 크기 지정
    // const left = (window.innerWidth - width) / 2;
    // const top = (window.innerHeight - height) / 2;
    // const url = "https://i10b310.p.ssafy.io/api/oauth2/authorization/google";
    // // 팝업 창으로 Google OAuth2 로그인 페이지 열기
    // window.open(
    //   url,
    //   "GoogleLogin",
    //   `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    // );
    // navigate("/workspace");
  };
  return (
    <MainLayout variant="vertical">
      {/* TODO: 크기 수정, 로고 추가*/}
      <div className="flex items-center justify-center w-full h-full">
        <LoginBox>
          <button onClick={handleGoogleLogin}>
            <GoogleButton />
          </button>
          <Link to={`/workspace`}>
            <KakaoButton />
          </Link>
          {/* FIXME 상기 버튼 누르기만 해도 워크스페이스로 이동하게 설정, 차후 수정할 것 */}
        </LoginBox>
      </div>
    </MainLayout>
  );
}
