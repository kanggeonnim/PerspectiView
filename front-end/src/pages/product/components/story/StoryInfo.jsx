import { ArrowLeft} from "lucide-react";
import RefTab from "./RefTab";
import StoryDetail from "./StoryDetail";
import { PageLayout } from "@/layouts/PageLayout";
import { Link } from "react-router-dom";

export default function StoryInfo() {
  return (
    <PageLayout>
      <Link to="../">
        {/* FIXME 뒤로가기 추가 예정 */}
        <ArrowLeft className="m-4" />
      </Link>
      <div className="flex items-center justify-center w-full h-full p-4 ">
        <StoryDetail />
        <RefTab />
      </div>  
    </PageLayout>
  );
}
