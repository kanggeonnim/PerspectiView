import kakao from "@/assets/kakao_logo.svg";
import { Button } from "@/components/ui/button";

export function KakaoButton() {
  return (
    <Button variant="kakao" className="flex items-center justify-center w-full gap-4 my-2">
      <img src={kakao} alt="" className="" />
      <div className="">카카오 로그인</div>
    </Button>
  );
}
