import UserSidebar from "@/components/sidebar/UserSidebar";
import { MainLayout } from "@/layouts/MainLayout";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function WorkspacePage() {
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex items-center justify-center w-full h-full">
        <Outlet />
      </div>
    </MainLayout>
  );
}
