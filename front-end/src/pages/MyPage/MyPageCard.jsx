import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function MyPageCard() {
  return (
    <div className="flex-col">
    <Card className="w-2/3 p-10 h-96">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col">
          <div className="text-2xl" >마이페이지</div>
          <div className="flex justify-around m-5">
            <div className="flex-col items-center gap-3">
              <img
                className="w-32 h-32 border-4 rounded-full"
                src="path-to-your-profile-image.jpg"
                alt=""
              />
              <div className="text-center">이름</div>
            </div>
            <div className="flex-col gap-10">
              <div className="flex-col gap-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input type="email" placeholder="" />
              </div>
              <div className="flex-col gap-1.5">
                <Label htmlFor="email">소개</Label>
                <Textarea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div className="self-end">탈퇴하기</div>
    </div>
  );
}

export default MyPageCard;
