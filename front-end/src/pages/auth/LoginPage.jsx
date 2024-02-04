import { MainLayout } from "@/layouts/MainLayout";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import logo from "@/assets/Logo.svg";

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
            <div className="space-y-1">
              <Link to={`/workspace`}>
                <GoogleButton />
              </Link>
            </div>
            <div className="space-y-1">
              <Link to={`/workspace`}>
                <KakaoButton />
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* <div className="flex justify-center items-center w-[25vw] border rounded-xl">
          <div className="flex flex-col w-3/5 h-[50vh] justify-around">
            <div className="flex justify-center">시:작</div>
            <div className="flex justify-center">로그인 후 서비스를 이용해보세요.</div>
            <div>
              <Link to={`/workspace`}>
                <GoogleButton />
              </Link>
              <Link to={`/workspace`}>
                <KakaoButton />
              </Link>
               FIXME 상기 버튼 누르기만 해도 워크스페이스로 이동하게 설정, 차후 수정할 것 
            </div>
          </div>
        </div >
        */}
      </div>
    </MainLayout>
  );
}
