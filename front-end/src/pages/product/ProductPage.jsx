import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/product/ProductSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useParams } from "react-router-dom";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useAuthStore } from "@/store/useAuthStore";
import useUserQueryModule from "@/hook/useUserQueryModule";
import { useState } from "react";

export default function ProductPage() {
  const { getUser, getUserIsSuccess } = useUserQueryModule();
  const { teamId, productId } = useParams();
  const { productData, getProductDataIsSuccess } = useProductQueryModule(teamId, productId);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 초기값은 true로 설정

  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <MainLayout variant="horizontal">
      <ProductSidebar />
      <PageLayout>
        {/* <ProductHeader /> */}
        {/* ProductHeader를 isStoryInfoVisible이 true일 때만 렌더링 */}
        {isHeaderVisible && <ProductHeader />}
        <div className="flex flex-col items-center justify-center w-full h-full max-h-full ">
          <Outlet context={{ setIsHeaderVisible }} />
          {/* Outlet에 상태 변경 함수 전달 */}
        </div>
      </PageLayout>
    </MainLayout>
  );
}
