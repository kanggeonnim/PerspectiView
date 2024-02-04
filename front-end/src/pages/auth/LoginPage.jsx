import { MainLayout } from "@/layouts/MainLayout";
import { LoginBox } from "./components/LoginBox";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <MainLayout variant="vertical">
      {/* TODO: 크기 수정, 로고 추가*/}
      <div className="flex items-center justify-center w-full h-full">
        <LoginBox className="w-full h-full">
          <Link to={`/workspace`}>
            <GoogleButton />
          </Link>
          <Link to={`/workspace`}>
            <KakaoButton />
          </Link>
          {/* FIXME 상기 버튼 누르기만 해도 워크스페이스로 이동하게 설정, 차후 수정할 것 */}
        </LoginBox>
      </div>
    </MainLayout>
  );
}
