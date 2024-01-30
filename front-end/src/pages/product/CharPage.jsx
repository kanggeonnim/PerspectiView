import { MainLayout } from "@/layouts/MainLayout";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { PageLayout } from "@/layouts/PageLayout";
import ProductHeader from "@/components/header/ProductHeader";
import { CharTab } from "./components/CharTab";

export default function CharPage() {
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <PageLayout>
        <ProductHeader />
        <div className="box-border h-full ">
          <CharTab className=""/>
        </div>
      </PageLayout>
    </MainLayout>
  );
}