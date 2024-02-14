import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useProductQueryModule from "@/hook/useProductQueryModule";
import ProductImageUploader from "@/pages/product/components/ImageUploader/ProductImageUploader";
import useProductAddStore from "@/store/useProductAddStore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkList from "./WorkList";
import Buttonselect from "./selects/ButtonSelect";
import RadioButtonSelect from "./selects/RadioButtonSelect";

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
  const { updateProduct } = useProductQueryModule(teamNo);
  const navigate = useNavigate();
  // const [isEdit, setIsEdit] = useState(false);
  const [productDetail, setProductDetail] = useState({
    productTitle: "",
    productInfo: "",
    category: null,
    genres: [],
    // uploadImage: "",
  });
  // console.log(productDetail);
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
                    <ProductImageUploader baseImg={product.productImageUrl} />
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
