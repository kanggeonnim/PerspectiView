import { MainLayout } from "@/layouts/MainLayout";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { PageLayout } from "@/layouts/PageLayout";
import ProductHeader from "@/components/header/ProductHeader";
import { StoryDialog } from "./components/StoryDialog";

export default function ProductPage() {
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <PageLayout>
        <ProductHeader />
        <div className="flex items-center justify-center w-full max-h-full m-auto h-4/5 ">
          {/* TODO: 수정 중 */}
          {/* <StoryDialog /> */}
        </div>
      </PageLayout>
    </MainLayout>
  );
}
