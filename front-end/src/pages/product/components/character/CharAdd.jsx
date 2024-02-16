import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { Plus } from "lucide-react";
import useCharQueryModule from "@/hook/useCharQueryModule";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useImageStore } from "@/store/useImageStore";

export default function CharAdd() {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();
  const [addChar, setAddChar] = useState({
    uploadImage: "string",
    characPostRequestDto: {
      characterName: "string",
      characterDetail: "string",
      characterPositionX: 0,
      characterPositionY: 0,
    },
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { images, setImages } = useImageStore();
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImages(selectedImage);
    console.log(images);
    console.log(event.target.files);
    setAddChar((addChar) => ({
      ...addChar,
      uploadImage: selectedImage, // 이미지 URL을 uploadImage 속성에 할당
    }));
  };

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
      setAddChar((addChar) => ({
        ...addChar,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
      }));
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  };

  const { charData, getCharIsSuccess, createChar, updateChar, deleteChar } = useCharQueryModule(
    teamId,
    productId
  );

  // console.log(charData);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Plus className="mt-4 mr-8" size={20} color="#52525b" />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col w-2/3 max-w-2/3 h-3/4 ">
        <CardTitle className="box-border text-2xl">
          <div>인물 추가</div>
        </CardTitle>
        <div className="box-border flex flex-row w-full h-3/4 ">
          <AlertDialogHeader className="flex items-center w-1/3 h-full">
            <div className="flex items-center justify-center w-40 h-40 my-3 bg-gray-300 border">
              <div
                className="flex flex-col items-center justify-center w-full my-3 bg-gray-300 border"
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
                      onChange={() => {
                        setAddChar({
                          ...addChar,
                          uploadImage: URL.createObjectURL(image),
                        });
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <PlusCircleIcon />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
                {image && (
                  <button className="w-full bg-red-500 " onClick={handleUploadImage}>
                    이미지 삭제
                  </button>
                )}
              </div>
            </div>
          </AlertDialogHeader>
          <div className="box-border flex flex-col w-2/3 h-full">
            <div className="flex flex-col justify-between justify-around w-full h-full">
              <div className="flex flex-row w-full m-2 h-1/4">
                <div className="box-border w-1/5 mr-3 text-xl">이름</div>
                <div className="box-border w-4/5">
                  <input
                    type="text"
                    name="title"
                    className="border"
                    onChange={(e) => {
                      setAddChar({
                        ...addChar,
                        characPostRequestDto: {
                          ...addChar.characPostDto,
                          characterName: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full m-2 h-1/4">
                {/* <div className="box-border w-1/5 mr-3 text-xl">특징</div>
                <div className="box-border w-4/5 h-1/2">
                  <CharTag />
                  
                  <CharTagAdd />
                </div> */}
              </div>
              <div className="flex flex-row w-full m-2 h-2/3">
                <div className="box-border w-1/5 mr-3 text-xl">세부 사항</div>
                <div className="box-border w-4/5 h-full">
                  <input
                    name="info"
                    onChange={(e) => {
                      setAddChar({
                        ...addChar,
                        characPostRequestDto: {
                          ...addChar.characPostRequestDto,
                          characterDetail: e.target.value,
                        },
                      });
                    }}
                    className="w-4/5 border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border p-3 border-t h-1/4">
          {/* <h2 className="text-xl font-semibold ">인물이 등장한 스토리</h2>
          <div>등장 스토리 추가 위치</div> */}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-none shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent"
            onClick={() => {
              // // create product
              setImage("");
            }}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // 캐릭터 POST
              // console.log("여기", addChar);
              setImage("");
              createChar(addChar);
            }}
          >
            생성
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
