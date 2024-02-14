import google from "@/assets/google_logo.svg";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  return (
    <Button variant="google" className="flex items-center justify-center w-full gap-4 ">
      <img src={google} alt="Google Login" />
      <div>구글 로그인</div>
    </Button>
  );
}
