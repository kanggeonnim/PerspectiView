import Google from "@/assets/Google.svg";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  return (
    <Button variant="google" className="box-border grid w-full grid-cols-8 my-2">
      <img src={Google} alt="col-span-1" />
      <div className="col-span-7">구글 로그인</div>
    </Button>
  );
}
