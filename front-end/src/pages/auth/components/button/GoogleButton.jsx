import Google from "@/assets/Google.svg";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  return (
    <Button variant="google" className="flex items-center justify-center w-full gap-4 ">
      <img src={Google} alt="Google Login" />
      <div>구글 로그인</div>
    </Button>
  );
}
