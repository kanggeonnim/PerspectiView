import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useProductQueryModule from "@/hook/useProductQueryModule";
import ProductImageUploader from "@/pages/product/components/ImageUploader/ProductImageUploader";
import useProductAddStore from "@/store/useProductAddStore";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkList from "./WorkList";
import Buttonselect from "./selects/ButtonSelect";
import RadioButtonSelect from "./selects/RadioButtonSelect";
import { useImageStore } from "@/store/useImageStore";

function CreateProduct() {
  const { inputs, setInputs, products, setProducts, onCreate } =
    useProductAddStore();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="flex flex-col items-center a">
      <WorkList
        products={products}
        productsId={products.id}
        title={inputs.name}
        info={inputs.description}
        onChange={onChange}
        onCreate={onCreate}
      />
    </div>
  );
}

function Product({ productImg, productName }) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-32 mx-3 my-1 h-36">
        <img
          className="w-full h-full rounded-xl"
          src={productImg}
          alt="cover of work"
        />
      </Card>
      <div className="m-2">{productName}</div>
    </div>
  );
}

export default function ProductList({ productsdata, teamNo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { teamId } = useParams();
  const { updateProductData } = useProductQueryModule(teamId);
  const navigate = useNavigate();
  
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const {images, setImages} = useImageStore()
  const handleImageChange = (event) => {
  const [isEdit, setIsEdit] = useState(false);
    // TODO 수정 해야되는지 아닌지 분기
  const selectedImage = event.target.files[0];
  setImage(selectedImage);
  setImages(selectedImage)
  // productid를 따오면...?
  setProductDetail(ProductDetail => ({
    ...ProductDetail,
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
      setProductDetail(ProductDetail => ({
        ...ProductDetail,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
        },
      )
      );
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  }
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
  // console.log(productDetail);

  // useEffect(() => {
  //   console.log("render productList", teamId);
  // }, [teamId]);

  return (

    
    <div className="flex flex-wrap h-full ">
      
      <div className="flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <CreateProduct />
      </div>

      {productsdata?.map((product) => (
        <div
          className="flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          key={product.productId}
        >
          {/* 여기서 수정 모달,  */}

          <AlertDialog className="w-full h-full">
            <div>
              <AlertDialogTrigger>
                <Product
                  productImg={product.productImageUrl}
                  productName={product.productTitle}
                />
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent className="flex flex-row w-2/3 max-w-2/3 h-2/3">
              <div className="box-border flex flex-col w-1/4 h-full p-3 m-3">
                <AlertDialogHeader className="flex flex-col w-full h-full">
                  <CardTitle className="text-2xl">
                    <div>작품 정보</div>
                  </CardTitle>
                  <div className="flex items-center justify-center w-full my-3 bg-gray-300 border h-2/3">
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
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">작품명</div>
                    <div className="box-border w-5/6">
                      {isEditing ? (
                        <Input
                          type="text"
                          name="title"
                          className="border"
                          onChange={(e) => {
                            setProductDetail({
                              ...productDetail,
                              productTitle: e.target.value,
                            });
                          }}
                          defaultValue={product.productTitle}
                        />
                      ) : (
                        <div>{product.productTitle}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">장르</div>
                    <div className="box-border flex flex-wrap w-5/6 gap-2">
                      <Buttonselect isEditing={isEditing} className="w-full" />
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">분류</div>
                    <div className="box-border flex flex-wrap w-5/6 gap-2">
                      <RadioButtonSelect isEditing={isEditing} />
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">설명</div>
                    <div className="box-border w-5/6">
                      {isEditing ? (
                        <Input
                          type="text"
                          name="info"
                          onChange={(e) => {
                            setProductDetail({
                              ...productDetail,
                              productInfo: e.target.value,
                            });
                          }}
                          className="w-4/5 border"
                          defaultValue={product.productInfo}
                        />
                      ) : (
                        <div>{product.productInfo}</div>
                      )}
                    </div>
                  </div>
                </div>
                <AlertDialogFooter>
                  <>
                    <AlertDialogCancel
                      className="shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </AlertDialogCancel>
                    {!isEditing ? (
                      <Button
                        className="bg-green-600"
                        onClick={() => {
                          setIsEditing(true);
                          // 추가 동작
                        }}
                      >
                        편집
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                        }}
                      >
                        편집완료
                      </Button>
                    )}
                    {!isEditing && (
                      <AlertDialogAction
                        onClick={() => {
                          navigate(
                            `/team/${teamNo}/product/${product.productId}`
                          );
                        }}
                      >
                        상세 보기
                      </AlertDialogAction>
                    )}
                  </>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
}
