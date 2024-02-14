import UserSidebar from "@/components/sidebar/user/UserSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useUserQueryModule from "@/hook/useUserQueryModule";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { PlusCircleIcon } from "lucide-react";

import { useRef, useState } from "react";

export default function MyPage() {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState(user?.nickname);
  const [userInfo, setUserInfo] = useState(user?.info);
  // const [UserImage, setUserImage] = useState(user?.image);
  const { updateUserInfo, deleteUser } = useUserQueryModule();
  // 여기
  const [mypageInfo, setMypageInfo] = useState({
    userRequestDto: {
      nickname: userNickname,
      email: user.email,
      userPhone: user.phone,
      userInfo: userInfo,
    },
    uploadImage: user.image,
  });
  const [image, setImage] = useState(user?.image);
  const fileInputRef = useRef(null);

  //이미지
  const uploadImage = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    console.log("여기", event.target.files);
    setMypageInfo((mypageInfo) => ({
      ...mypageInfo,
      uploadImage: selectedImage, // 이미지 URL을 uploadImage 속성에 할당
    }));
  };

  // 파일 열리는 기능
  const handleUploadClick = () => {
    if (image) {
      // 이미지가 있는 경우 초기화
      setImage(null);
    } else {
      // 이미지가 없는 경우 파일 업로드 창 열기
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = async () => {
    if (image) {
      // const formData = new FormData();
      // formData.append("uploadImage", image);
      // console.log(formData);
      console.log(image);
      setMypageInfo((mypageInfo) => ({
        ...mypageInfo,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
      }));
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  };

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
                    {/* 여기 */}
                    <div className="flex items-center justify-center w-full my-3 bg-gray-300 border h-2/3">
                      {/* <PlusCircleIcon /> */}
                      <div
                        className="flex flex-col items-center justify-center w-full h-full my-3 bg-gray-300 border h-2/3"
                        onClick={handleUploadClick}
                        style={{ cursor: "pointer" }}
                      >
                        {image ? (
                          <div className="w-full h-full">
                            <img
                              className="w-full h-full"
                              src={URL.createObjectURL(image)}
                              alt="Uploaded"
                              style={{ maxWidth: "300px" }}
                            />
                          </div>
                        ) : (
                          <>
                            <PlusCircleIcon />
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={uploadImage}
                              style={{ display: "none" }}
                            />
                          </>
                        )}
                        {image && (
                          <button
                            className="w-full bg-red-500 "
                            onClick={handleUploadImage}
                          >
                            이미지 삭제
                          </button>
                        )}
                      </div>
                    </div>
                    {/* <img
                      className="w-32 h-32 border-4 rounded-full"
                      src={UserImage}
                      alt=""
                    /> */}
                    {!isEditing ? (
                      <div className="text-center">{userNickname}</div>
                    ) : (
                      <Input
                        value={userNickname}
                        onChange={(e) => setUserNickname(e.target.value)}
                        placeholder=""
                      />
                    )}
                    {/* FIXME 파라미터 설정중 */}
                  </div>
                  <div className="flex-col gap-10">
                    <div className="flex-col gap-1.5">
                      <Label htmlFor="emailInput">이메일</Label>
                      <div>{user?.email}</div>
                    </div>
                    <div className="flex-col gap-1.5">
                      <Label htmlFor="infoInput">소개</Label>
                      {!isEditing ? (
                        <div>{userInfo}</div>
                      ) : (
                        <Textarea
                          id="infoInput"
                          value={userInfo}
                          onChange={(e) => setUserInfo(e.target.value)}
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
                updateUserInfo(mypageInfo);
              }}
            >
              수정완료
            </Button>
          )}
          <div
            className="self-end underline"
            onClick={() => {
              // console.log("회원탈퇴클릭");
              deleteUser(mypageInfo);
            }}
          >
            탈퇴하기
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
