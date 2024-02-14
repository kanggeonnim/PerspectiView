import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardTitle } from "@/components/ui/card";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useTeamListStore } from "@/store/team/useTeamListStore";
import { useImageStore } from "@/store/useImageStore";
import { BookPlus, PlusCircleIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Buttonselect from "./selects/ButtonSelect";
import RadioButtonSelect from "./selects/RadioButtonSelect";

function WorkList({ title, info, productsId, onChange, onCreate }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [productDetail, setProductDetail] = useState({
    productRequestDto: {
      productTitle: "",
      productInfo: "",
      category: {
        id: "1",
        name: "웹소설",
      },
      genres: [
        {
          id: "1",
          name: "SF",
        },
      ],
    },
    uploadImage: "",
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { images, setImages } = useImageStore();
  const { teamList } = useTeamListStore();
  const { teamId } = useParams();

  // const [teamNo, setTeamNo] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImages(selectedImage);
    setProductDetail((ProductDetail) => ({
      ...ProductDetail,
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
      console.log(formData);
      console.log(image);
      setProductDetail((ProductDetail) => ({
        ...ProductDetail,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
      }));
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  };

  // useEffect(() => {
  //   if (teamList) {
  //     setTeamNo(() => teamList[0].id);
  //     console.log(teamList);
  //   }
  //   console.log(teamNo);
  // }, [teamList, teamNo]);

  // FIXME 팀 ID undefined 발생
  const { createProductData } = useProductQueryModule(teamId);

  return (
    <form>
      <AlertDialog className="w-full h-full">
        <div>
          <AlertDialogTrigger>
            <Card
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center w-32 border h-36"
            >
              <BookPlus color="#909090" />
            </Card>
          </AlertDialogTrigger>
        </div>
        <AlertDialogContent className="flex flex-row w-2/3 max-w-2/3 h-2/3">
          <div className="box-border flex flex-col w-1/4 h-full p-3 m-3">
            <AlertDialogHeader className="flex flex-col w-full h-full">
              <CardTitle className="text-2xl">
                <div>작품 생성</div>
              </CardTitle>
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
                        onChange={(e) => {
                          setProductDetail({
                            ...productDetail,
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
                    <button
                      className="w-full bg-red-500 "
                      onClick={handleUploadImage}
                    >
                      이미지 삭제
                    </button>
                  )}
                </div>
              </div>
            </AlertDialogHeader>
          </div>
          <div className="box-border flex flex-col w-2/3 h-full p-3">
            <div className="flex flex-col justify-around w-full h-5/6">
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">작품명</div>
                <div className="box-border w-5/6">
                  <input
                    type="text"
                    name="title"
                    className="border"
                    onChange={(e) => {
                      setProductDetail({
                        ...productDetail,
                        productRequestDto: {
                          ...productDetail.productRequestDto,
                          productTitle: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">장르</div>
                <div className="box-border flex flex-wrap w-5/6 gap-2">
                  <Buttonselect
                    className="w-full"
                    onSelect={setSelectedGenres}
                    selectedGenres={selectedGenres}
                    isEditing={isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">분류</div>
                <div className="box-border flex flex-wrap w-5/6 gap-2">
                  <RadioButtonSelect isEditing={isEditing} />
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">설명</div>
                <div className="box-border w-5/6">
                  <input
                    name="info"
                    onChange={(e) => {
                      setProductDetail({
                        ...productDetail,
                        productRequestDto: {
                          ...productDetail.productRequestDto,
                          productInfo: e.target.value,
                        },
                      });
                    }}
                    className="w-4/5 border"
                  />
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>취소하기</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  console.log(productDetail);
                  // // create product
                  createProductData(productDetail);
                }}
              >
                생성하기
              </AlertDialogAction>
              {/* FIXME 해당 생성하기는 추후 작품 생성 기능 구현 */}
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}

export default WorkList;
