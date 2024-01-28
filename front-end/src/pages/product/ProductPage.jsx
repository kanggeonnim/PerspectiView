import DefaultHeader from "@/components/header/DefaultHeader";
import { MainLayout } from "@/layouts/MainLayout";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { PageLayout } from "@/layouts/PageLayout";

export default function ProductPage() {

    return (
        <MainLayout variant="horizontal">
            <UserSidebar />
            <PageLayout />
        </MainLayout>
    )
}