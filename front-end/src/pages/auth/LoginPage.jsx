import { MainLayout } from "@/layouts/MainLayout";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/main_logo.svg";
import { NaverButton } from "./components/button/NaverButton";

export default function LoginPage() {
  return (
    <MainLayout variant="vertical">
      <div className="flex items-center justify-center w-full h-full">
        <Card className="w-1/3 drop-shadow-2xl">
          <CardHeader className="items-center mb-3">
            <CardTitle>
              <Link to={`/`}>
                <div className="my-6 mr-3">
                  <img className="w-auto h-20" src={logo} alt="logo" />
                </div>
              </Link>
            </CardTitle>
            <CardDescription className="text-lg font-black ">
              로그인 후 서비스를 이용해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 mb-2 space-y-2">
            <Link to="https://i10b310.p.ssafy.io/api/oauth2/authorization/google">
              <GoogleButton />
            </Link>
            <Link to="https://i10b310.p.ssafy.io/api/oauth2/authorization/kakao">
              <KakaoButton />
            </Link>
            <Link to="https://i10b310.p.ssafy.io/api/oauth2/authorization/naver">
              <NaverButton />
            </Link>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
