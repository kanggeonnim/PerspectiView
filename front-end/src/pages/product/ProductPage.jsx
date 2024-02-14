import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/product/ProductSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useParams } from "react-router-dom";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import useCharQueryModule from "@/hook/useCharQueryModule";

export default function ProductPage() {
  const { teamId, productId } = useParams();
  const { getProductDataIsSuccess } = useProductQueryModule(teamId, productId);
  const { charData, getCharIsSuccess } = useCharQueryModule(teamId, productId);
  const [charList, setCharList] = useState();
  const { product } = useProductStore();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 초기값은 true로 설정

  useEffect(() => {
    console.log("render", teamId);
    console.log(product);
    console.log(charData);
  }, [product, teamId, charData]);

  if (!getProductDataIsSuccess && !getCharIsSuccess) {
    return <div>Loading...</div>;
  }
  return (
    <MainLayout variant="horizontal">
      <ProductSidebar />
      <PageLayout>
        {/* {isHeaderVisible && <ProductHeader />} */}
        <div className="flex flex-col items-center justify-center w-full h-full max-h-full ">
          <Outlet context={{ setIsHeaderVisible }} />
        </div>
      </PageLayout>
    </MainLayout>
  );
}
