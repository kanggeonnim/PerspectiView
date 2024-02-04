import DefaultHeader from "@/components/header/DefaultHeader";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <MainLayout variants="horizon">
      <DefaultHeader />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center m-10">
          <div className="text-3xl text-center text-wrap">스토리 흐름을 보며</div>
          <div className="text-3xl text-center text-wrap">나만의 작품을 생성해보세요</div>
        </div>
        <Link to="/login">
          <Button className="">시작하기</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
