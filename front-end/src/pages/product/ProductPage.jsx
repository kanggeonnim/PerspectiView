import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/product/ProductSidebar";
import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useParams } from "react-router-dom";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProductPage() {
  const { getUser, getUserIsSuccess } = useUserQueryModule();
  const { teamId, productId } = useParams();
  const { productData, getProductDataIsSuccess } = useProductQueryModule(teamId, productId);
  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <MainLayout variant="horizontal">
      <ProductSidebar />
      <PageLayout>
        <ProductHeader />
        <div className="flex flex-col items-center justify-center w-full h-full max-h-full ">
          <Outlet />
        </div>
      </PageLayout>
    </MainLayout>
  );
}
