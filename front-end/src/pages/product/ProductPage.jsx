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
        <StoryDialog />
      </PageLayout>
    </MainLayout>
  );
}
