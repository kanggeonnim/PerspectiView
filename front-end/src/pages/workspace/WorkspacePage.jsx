import UserSidebar from "@/components/sidebar/user/UserSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function WorkspacePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate(`/workspace/team/${user.personalTeamId}`);
    }
  }, [user, navigate]);

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex flex-col items-center justify-center w-full m-2">
        <Outlet />
      </div>
    </MainLayout>
  );
}
