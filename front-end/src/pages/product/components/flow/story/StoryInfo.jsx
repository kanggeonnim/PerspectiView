import { ArrowLeft } from "lucide-react";
import RefContents from "./RefContents";
import StoryDetail from "./StoryDetail";
import { PageLayout } from "@/layouts/PageLayout";
import { useNavigate } from "react-router-dom";

export default function StoryInfo() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <ArrowLeft className="m-4 " onClick={() => navigate(-1)} />
      <div className="flex items-center justify-center w-full h-full p-4 border-2 ">
        <StoryDetail />
        <RefContents />
      </div>
    </PageLayout>
  );
}
