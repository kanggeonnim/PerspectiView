import UserSidebar from "@/components/sidebar/user/UserSidebar";
import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { getUserIsSuccess } = useUserQueryModule();

  const { user } = useAuthStore();

  useEffect(() => {
    const accessToken = params.get("accessToken");

    if (accessToken && user) {
      // navigate(`/workspace/team/${user.personalTeamId}`);
      console.log("user", user);
    }
  }, [params, user, navigate]);

  if (!user || !getUserIsSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex flex-col items-center justify-center w-full m-2">
        <Outlet />
      </div>
    </MainLayout>
  );
}
