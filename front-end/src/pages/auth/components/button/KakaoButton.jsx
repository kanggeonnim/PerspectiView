import { Button } from "../ui/button";
import kakao from "@/assets/Kakao.svg"

export function KakaoButton() {

  return (

    <Button variant="kakao" className="w-[320px] grid grid-cols-8 box-border my-2">
      <img src={kakao} alt="" className=" col-span-1"/>
      <div className="col-span-7">
        카카오 로그인
      </div>
    </Button>

  )
}