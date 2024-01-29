import UserSidebar from "@/components/sidebar/UserSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import MyPageCard from "./MyPageCard";

export default function MyPage() {
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex items-center justify-center w-full h-full">
        <MyPageCard />
      </div>
    </MainLayout>
  );
}
