import { ArrowLeft } from "lucide-react";
import RefTab from "./RefTab";
import StoryDetail from "./StoryDetail";
import { PageLayout } from "@/layouts/PageLayout";

export default function StoryInfo() {
  return (
    // TODO: 뒤로가기
    <PageLayout>
      <ArrowLeft className="m-4 " />
      <div className="flex items-center justify-center w-full h-full p-4 ">
        <StoryDetail />
        <RefTab />
      </div>  
    </PageLayout>
  );
}
