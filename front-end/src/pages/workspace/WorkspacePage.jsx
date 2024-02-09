import UserSidebar from "@/components/sidebar/UserSidebar";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { getCookie, setCookie } from "@/util/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import useProductStore from "@/store/useProductStore";

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
  // const { productData, getProductIsSuccess} = useProductQueryModule('3');

  // useEffect(()=> {
  //   if(productData){
  //     console.log("getproduct", getProductIsSuccess, productData[0].category)

  //   }
  // })

  useEffect(() => {
    if (accessToken) {
      navigate("/workspace");
      setCookie("token", accessToken);
      setCookie("refreshToken", refreshToken); // 쿠키에 토큰 저장
      console.log(accessToken, getCookie("token"));
      // setUser();
    }
  }, []);
    // const productCall = ({ productData, itemsPerPage }) => {
    //   const { setProductData } = useProductStore();
    
    //   useEffect(() => {
    //     if (productData) {
    //       setProductData(productData, itemsPerPage);
    //       console.log("getproduct", getProductIsSuccess, productData);
    //     }
    //   }, [productData, itemsPerPage]);}


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
