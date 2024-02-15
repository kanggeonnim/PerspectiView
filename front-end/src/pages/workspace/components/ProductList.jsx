import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowUpRight, PlusCircleIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useProductQueryModule from "@/hook/useProductQueryModule";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkList from "./WorkList";
import Buttonselect from "./selects/ButtonSelect";
import RadioButtonSelect from "./selects/RadioButtonSelect";
import useProductAddStore from "@/store/useProductAddStore";




function CreateProduct() {
  const { inputs, setInputs, products, onCreate } = useProductAddStore();
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
        <img className="w-full h-full rounded-xl" src={productImg} alt="cover of work" />
      </Card>
      <div className="m-2">{productName}</div>
    </div>
  );
}

export default function ProductList({ productsdata, teamNo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { teamId } = useParams();
  const [prodId, setProdId] = useState(false)
  const handleEditProduct = (productId) => {
    setProdId(productId)
  };
  console.log(prodId)
  const { updateProductData, deleteProductData } = useProductQueryModule(teamId, prodId);
  console.log(productsdata)
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCates, setSelectedCates] = useState("");
  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };
  
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];
    setImage(selectedImage);
    // productid를 따오면...?
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
      console.log(image)
      setProductDetail(ProductDetail => ({
        ...ProductDetail,
        uploadImage: image, // 이미지 URL을 uploadImage 속성에 할당
      }));
      // 이미지 업로드 후 이미지 지우기
      setImage(null);
    }
  };

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



 

  return (
    <div className="flex flex-wrap items-start h-full ">
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
                <Product productImg={product.productImageUrl} productName={product.productTitle} />
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
                      {product.productImageUrl ? (
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={product.productImageUrl}
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
                      {product.productImageUrl && isEditing && (
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
              <div className="box-border flex flex-col w-2/3 h-full p-3 ">
                <div className="flex justify-end ">
                  <AlertDialogCancel
                    className="right-0 border-none shadow-none bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                    onClick={() => setIsEditing(false)}
                  >
                    <X />
                  </AlertDialogCancel>
                </div>
                <div className="flex flex-col justify-around w-full h-5/6">
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">작품명</div>
                    <div className="box-border w-5/6">
                      {isEditing ? (
                        <Input
                          type="text"
                          name="title"
                          className="w-4/5 border"
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
                      {isEditing ? (
                        <Buttonselect isEditing={isEditing} 
                        className="w-full" onSelect={setSelectedGenres}/>
                        ) : (<Buttonselect isEditing={isEditing} 
                          className="w-full" onSelect={setSelectedGenres}/>)}
                      {/* <Buttonselect isEditing={isEditing} className="w-full" onSelect={setSelectedGenres}/> */}
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">분류</div>
                    <div className="box-border flex flex-wrap w-5/6 gap-2">
                      {isEditing ? (
                      <RadioButtonSelect isEditing={isEditing} onSelectRadio={setSelectedCates} />
                      ) : (<RadioButtonSelect isEditing={isEditing} onSelectRadio={setSelectedCates} />)}
                      
                      {/* <RadioButtonSelect isEditing={isEditing} onSelectRadio={setSelectedCates} /> */}
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
                    {!isEditing ? (
                      <Button
                        variant="secondary"
                        className="border"
                        onClick={() => {
                          setIsEditing(true);
                          handleEditProduct(product.productId)
                          // 추가 동작
                        }}
                      >
                        편집
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="right-0 border-none shadow-none bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                          onClick={() => setIsEditing(false)}
                        >
                          취소
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            // setImage("")
                            deleteProductData(productDetail);
                          }}
                        >
                          삭제
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            // setImage("")
                            console.log(productDetail);
                            // updateProductData(productDetail);
                          }}
                        >
                          완료
                        </Button>
                      </>
                    )}
                    {!isEditing && (
                      <AlertDialogAction
                        onClick={() => {
                          navigate(`/team/${teamNo}/product/${product.productId}`);
                        }}
                      >
                        상세 보기
                        <ArrowUpRight className="ml-1" size={15} />
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
