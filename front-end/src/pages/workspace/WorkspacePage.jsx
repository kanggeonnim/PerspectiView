import UserSidebar from "@/components/sidebar/UserSidebar";
import useUserQueryModule from "@/hook/useUserQueryModule";
// import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

// 내 작품 목록 데이터
const myProductInfoData = Array.from({ length: 120 }, (_, index) => ({
  productId: index + 1,
  productImg: `https://picsum.photos/${((index % 15) + 1) * 100}/300`,
  productName: `나의 싸피 생활 ${index + 1}`,
  // category: {
  //   categoryId: "1",
  //   categoryName: "웹툰",
  // },
  // genreList: [
  //   {
  //     genreId: "1",
  //     genreName: "SF",
  //   },
  //   {
  //     genreId: "2",
  //     genreName: "액션",
  //   },
  //   {
  //     genreId: "3",
  //     genreName: "드라마",
  //   },
  // ],
}));

// 속한 팀 작품 목록 데이터
const teamProductInfoData = Array.from({ length: 220 }, (_, index) => ({
  productId: index + 1,
  productImg: `https://picsum.photos/${((index % 15) + 1) * 100}/300`,
  productName: `팀 싸피 생활 ${index + 1}`,
  // category: {
  //   categoryId: "1",
  //   categoryName: "웹툰",
  // },
  // genreList: [
  //   {
  //     genreId: "1",
  //     genreName: "SF",
  //   },
  //   {
  //     genreId: "2",
  //     genreName: "액션",
  //   },
  //   {
  //     genreId: "3",
  //     genreName: "드라마",
  //   },
  // ],
}));

export default function WorkspacePage() {
  const navigate = useNavigate();

  // const setUser = useAuthStore((state) => state.setUser);
  const { getUser, getUserIsSuccess } = useUserQueryModule();
  console.log("getUser", getUserIsSuccess, getUser);

  const [searchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["refresh token"]); // 쿠키 훅

  const ACCESS_TOKEN = searchParams.get("accessToken");
  const REFRESH_TOKEN = searchParams.get("refreshToken");

  useEffect(() => {
    console.log(ACCESS_TOKEN);
    if (ACCESS_TOKEN) {
      navigate("/workspace");
      sessionStorage.setItem("token", ACCESS_TOKEN);
      // setUser();
      setCookie("refresh token", REFRESH_TOKEN); // 쿠키에 토큰 저장
    }
    console.log(cookies);
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  // const [workspaceName, setWorkspaceName] = useState();

  // const getWorkspaceName = (name) => {
  //   setWorkspaceName(name);
  // };
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex flex-col items-center justify-center w-full m-2">
        <Outlet />
      </div>
    </MainLayout>
  );
}
