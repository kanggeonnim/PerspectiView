import ProductHeader from "@/components/header/ProductHeader";
import ProductSidebar from "@/components/sidebar/ProductSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import { Outlet, useLocation } from "react-router-dom";

export default function ProductPage() {
  const { pathname } = useLocation();
  console.log(pathname);
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
