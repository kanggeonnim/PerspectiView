import UserSidebar from "@/components/sidebar/user/UserSidebar";
// import useProductQueryModule from "@/hook/useProductQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { getCookie, setCookie } from "@/util/cookie";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useProductListStore from "@/store/useProductListStore";
import useUserQueryModule from "@/hook/useUserQueryModule";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

// 내 작품 목록 데이터
// const myProductInfoData = Array.from({ length: 120 }, (_, index) => ({
//   productId: index + 1,
//   productImg: `https://picsum.photos/${((index % 15) + 1) * 100}/300`,
//   productName: `나의 싸피 생활 ${index + 1}`,
//   // category: {
//   //   categoryId: "1",
//   //   categoryName: "웹툰",
//   // },
//   // genreList: [
//   //   {
//   //     genreId: "1",
//   //     genreName: "SF",
//   //   },
//   //   {
//   //     genreId: "2",
//   //     genreName: "액션",
//   //   },
//   //   {
//   //     genreId: "3",
//   //     genreName: "드라마",
//   //   },
//   // ],
// }));

// 속한 팀 작품 목록 데이터
// const teamProductInfoData = Array.from({ length: 220 }, (_, index) => ({
//   productId: index + 1,
//   productImg: `https://picsum.photos/${((index % 15) + 1) * 100}/300`,
//   productName: `팀 싸피 생활 ${index + 1}`,
//   // category: {
//   //   categoryId: "1",
//   //   categoryName: "웹툰",
//   // },
//   // genreList: [
//   //   {
//   //     genreId: "1",
//   //     genreName: "SF",
//   //   },
//   //   {
//   //     genreId: "2",
//   //     genreName: "액션",
//   //   },
//   //   {
//   //     genreId: "3",
//   //     genreName: "드라마",
//   //   },
//   // ],
// }));

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

  // const { productList, getProductListIsSuccess} = useProductQueryModule('3');

  // useEffect(()=> {
  //   if(productList){
  //     console.log("getproduct", getProductListIsSuccess, productList[0].category)

  //   }
  // })

  // const productCall = ({ productList, itemsPerPage }) => {
  //   const { setProductList } = useProductListStore();

  //   useEffect(() => {
  //     if (productList) {
  //       setProductList(productList, itemsPerPage);
  //       console.log("getproduct", getProductListIsSuccess, productList);
  //     }
  //   }, [productList, itemsPerPage]);}

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex flex-col items-center justify-center w-full m-2">
        <Outlet />
      </div>
    </MainLayout>
  );
}
