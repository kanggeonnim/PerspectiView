import { MainLayout } from "@/layouts/MainLayout";
import { PageLayout } from "@/layouts/PageLayout";
import ProductHeader from "@/components/header/ProductHeader";

import ProductSidebar from "@/components/sidebar/ProductSidebar";
import StoryInfo from "./components/story/StoryInfo";

export default function ProductPage() {
  return (
    <MainLayout variant="horizontal">
      <ProductSidebar />
      <PageLayout>
        {/* <ProductHeader /> */}
        <div className="flex items-center justify-center w-full h-full max-h-full ">
          {/* empty data */}
          {/* <div className="text-2xl font-bold text-center">
            <p>플롯을 생성하고</p>
            <p>나만의 이야기를 작성해보세요.</p>
          </div> */}

          <StoryInfo />
        </div>
      </PageLayout>
    </MainLayout>
  );
}
