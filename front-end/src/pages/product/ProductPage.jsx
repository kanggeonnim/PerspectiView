import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/product/ProductSidebar";
import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useLocation } from "react-router-dom";
import useProductAddStore from "@/store/useProductAddStore";

export default function ProductPage() {
  const { getUser, getUserIsSuccess } = useUserQueryModule();

  const { pathname } = useLocation();
  console.log(pathname);
  // const { products } = useProductAddStore();
  // console.log(products);

  if (!getUserIsSuccess) {
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
