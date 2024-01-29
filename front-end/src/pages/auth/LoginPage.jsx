import DefaultHeader from "@/components/header/DefaultHeader";
import { MainLayout } from "@/layouts/MainLayout";
import { LoginBox } from "./components/LoginBox";
import { GoogleButton } from "./components/button/GoogleButton";
import { KakaoButton } from "./components/button/KakaoButton";

export default function LoginPage() {
  return (
    <MainLayout variant="vertical">
      <DefaultHeader />
      <div className="flex items-center justify-center w-full h-full">
        <LoginBox>
          <GoogleButton />
          <KakaoButton />
        </LoginBox>
      </div>
    </MainLayout>
  );
}
