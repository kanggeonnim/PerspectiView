import kakao from "@/assets/Kakao.svg";
import { Button } from "@/components/ui/button";

export function KakaoButton() {
  return (
    <Button variant="kakao" className="flex justify-center items-center w-full gap-4 my-2">
      <img src={kakao} alt="" className="" />
      <div className="">카카오 로그인</div>
    </Button>
  );
}
