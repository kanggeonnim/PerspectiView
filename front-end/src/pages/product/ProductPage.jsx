import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/product/ProductSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useParams } from "react-router-dom";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";

export default function ProductPage() {
  const { teamId, productId } = useParams();
  const { getProductDataIsSuccess } = useProductQueryModule(teamId, productId);
  const { product } = useProductStore();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 초기값은 true로 설정

  useEffect(() => {
    console.log("render", teamId);
    console.log(product);
  }, [product, teamId]);
  if (!getProductDataIsSuccess) {
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
