import UserSidebar from "@/components/sidebar/user/UserSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useUserQueryModule from "@/hook/useUserQueryModule";
// import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export default function MyPage() {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const { updateUserInfo } = useUserQueryModule();

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col w-2/3 p-10 h-96">
          {/* <div>
      <div>id: {myparams.id}</div>
    </div> */}
          <Card className="w-full h-full p-10 ">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex flex-col">
                <div className="text-2xl">마이페이지</div>
                <div className="flex justify-around m-5">
                  <div className="flex-col items-center gap-3">
                    <img
                      className="w-32 h-32 border-4 rounded-full"
                      src="path-to-your-profile-image.jpg"
                      alt=""
                    />
                    <div className="text-center">{user.nickname}</div>
                    {/* FIXME 파라미터 설정중 */}
                  </div>
                  <div className="flex-col gap-10">
                    <div className="flex-col gap-1.5">
                      <Label htmlFor="emailInput">이메일</Label>
                      {!isEditing ? (
                        <div>{user.email}</div>
                      ) : (
                        <Input
                          id="emailInput"
                          type="email"
                          value={user.email} // 상태 값을 value로 지정
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                          placeholder=""
                        />
                      )}
                    </div>
                    <div className="flex-col gap-1.5">
                      <Label htmlFor="infoInput">소개</Label>
                      {!isEditing ? (
                        <div>{user.info}</div>
                      ) : (
                        <Textarea
                          id="infoInput"
                          value={user.info} // 상태 값을 value로 지정
                          onChange={(e) =>
                            setUser({ ...user, info: e.target.value })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* 수정 api */}
          {!isEditing ? (
            <Button
              className="self-end w-16"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
          ) : (
            <Button
              className="self-end w-16"
              onClick={() => {
                setIsEditing(false);
                updateUserInfo(user);
              }}
            >
              수정완료
            </Button>
          )}
          <div className="self-end underline">탈퇴하기</div>
        </div>
      </div>
    </MainLayout>
  );
}
