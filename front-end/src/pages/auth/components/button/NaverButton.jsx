import naver from "@/assets/naver_logo.svg";
import { Button } from "@/components/ui/button";

export function NaverButton() {
  return (
    <Button variant="naver" className="flex items-center justify-center w-full gap-4 my-2">
      <img src={naver} alt="" className="" />
      <div className="">네이버 로그인</div>
    </Button>
  );
}
