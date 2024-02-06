import { MainLayout } from "@/layouts/MainLayout";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import logo from "@/assets/Logo.svg";

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
            <div
              className="space-y-1"
              onClick={() => {
                const url = "https://i10b310.p.ssafy.io/api/login/oauth2/code/google";
                window.open(url);
                const token = new URL(url).searchParams.get("accessToken");
                const refreshToken = new URL(url).searchParams.get("refreshToken");

                console.log(token);
                if (token) {
                  localStorage.setItem("token", token);
                  localStorage.setItem("refreshToken", refreshToken);
                }
              }}
            >
              <GoogleButton />
            </div>

            <div className="space-y-1">
              <KakaoButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
