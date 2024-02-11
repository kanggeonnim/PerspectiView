import UserSidebar from "@/components/sidebar/user/UserSidebar";
// import useProductQueryModule from "@/hook/useProductQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { setCookie } from "@/util/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
export default function WorkspacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (accessToken) {
      console.log("render");
      navigate("/workspace");
      setCookie("token", accessToken);
      setCookie("refreshToken", refreshToken); // 쿠키에 토큰 저장
    }
  }, [accessToken, refreshToken]);

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex flex-col items-center justify-center w-full m-2">
        <Outlet />
      </div>
    </MainLayout>
  );
}
