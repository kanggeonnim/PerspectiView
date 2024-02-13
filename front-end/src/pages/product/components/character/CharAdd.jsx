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
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useImageStore } from "@/store/useImageStore";
import ImageUploader from "../ImageUploader/ImageUploader";
// import CharTag from "./CharTag";
// import CharTagAdd from "./CharTagAdd";

export default function CharAdd({
  name,
  description,
  url,
  onChange,
  onCreate,
}) {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();
  const [addChar, setAddChar] = useState({
    uploadImage: "string",
    characterRequestDto: {
      name: "string",
      detail: "string",
      positionX: 0,
      positionY: 0
    }
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const {images, setImages} = useImageStore()
  const handleImageChange = (event) => {

    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImages(selectedImage)
    console.log(images)
    console.log(event.target.files)
    setAddChar(addChar => ({
      ...addChar,
      uploadImage: selectedImage, // 이미지 URL을 uploadImage 속성에 할당
      },
    ))

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
      console.log(formData);
      console.log(image)
      setAddChar(addChar => ({
        ...addChar,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
        },
      )
      );
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  }



  const [newCharName, setNewCharName] = useState("");
  const [newCharDescript, setNewCharDescript] = useState("");
  const { charData, getCharIsSuccess, createChar, updateChar, deleteChar } =
    useCharQueryModule(teamId, productId);

  // console.log(charData);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Plus className="mt-4 mr-8" size={20} color="#52525b" />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col w-2/3 max-w-2/3 h-3/4 ">
        <CardTitle className="text-2xl box-border">
          <div>인물 추가</div>
        </CardTitle>
        <div className="box-border flex flex-row w-full h-3/4 ">
          <AlertDialogHeader className="flex w-1/3 h-full items-center">
            <div className="flex items-center justify-center w-40 h-40 my-3 bg-gray-300 border">
            <div className="flex flex-col items-center justify-center w-full my-3 border bg-gray-300"
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
                        onChange={(e) => {
                          setAddChar({
                            ...addChar,
                            uploadImage : URL.createObjectURL(image)
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
                    <button className=" bg-red-500 w-full" onClick={handleUploadImage}>이미지 삭제</button>
                  )}
                </div>
            </div>
          </AlertDialogHeader>
          <div className="box-border flex flex-col w-2/3 h-full">
            <div className="flex flex-col justify-around w-full h-full justify-between">
              <div className="flex flex-row w-full m-2 h-1/4">
                <div className="box-border w-1/5 mr-3 text-xl">이름</div>
                <div className="box-border w-4/5">
                  {/* <input
                    name="name"
                    className="border"
                    value={newCharName}
                    onChange={(e) => setNewCharName(e.target.value)}
                  /> */}
                  <input
                    type="text"
                    name="title"
                    className="border"
                    onChange={(e) => {
                      setAddChar({
                        ...addChar,
                        characterRequestDto: {
                          ...addChar.characterRequestDto,
                          name: e.target.value,
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
                        characterRequestDto: {
                          ...addChar.characterRequestDto,
                          detail: e.target.value,
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
        <div className="h-1/4 border-t box-border p-3">
          {/* <h2 className=" text-xl font-semibold">인물이 등장한 스토리</h2>
          <div>등장 스토리 추가 위치</div> */}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // 캐릭터 POST
              console.log("여기", addChar);
              createChar(addChar);
            }}
          >
            생성하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
