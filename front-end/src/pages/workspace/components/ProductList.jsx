import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import WorkList from "./WorkList";
import useProductAddStore from "@/store/useProductAddStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RadioSelect from "./selects/radioSelect";
import Buttonselect from "./selects/ButtonSelect";

function CreateProduct() {
  const { inputs, setInputs, products, setProducts, onCreate } = useProductAddStore();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <div className="flex flex-col items-center">
      <WorkList
        products={products}
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
  const { teamId } = useParams();
  const [productDetail, setProductDetail] = useState({
    productTitle: "",
    productInfo: "",
    category: null,
    genres: [],
    uploadImage: "",
  });

  console.log(productDetail);
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
                <Product productImg={product.productImageUrl} productName={product.productTitle} />
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent className="flex flex-row w-2/3 max-w-2/3 h-2/3">
              <div className="box-border flex flex-col w-1/4 h-full p-3 m-3">
                <AlertDialogHeader className="flex flex-col w-full h-full">
                  <CardTitle className="text-2xl">
                    <div>작품 편집</div>
                  </CardTitle>
                  <div className="flex items-center justify-center w-full my-3 bg-gray-300 border h-2/3">
                    빈칸
                  </div>
                </AlertDialogHeader>
              </div>
              <div className="box-border flex flex-col w-2/3 h-full p-3">
                <div className="flex flex-col justify-around w-full h-5/6">
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">작품명</div>
                    <div className="box-border w-5/6">
                      <input
                        type="text"
                        name="title"
                        className="border"
                        onChange={(e) => {
                          setProductDetail({
                            ...productDetail,
                            productTitle: e.target.value,
                          });
                        }}
                        defaultvalue={product.productTitle}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">장르</div>
                    <div className="box-border flex flex-wrap w-5/6 gap-2">
                      <Buttonselect className="w-full" />
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">분류</div>
                    <div className="box-border flex flex-wrap w-5/6 gap-2">
                      <RadioSelect />
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/6">
                    <div className="box-border w-1/6 mr-3 text-xl">설명</div>
                    <div className="box-border w-5/6">
                      <input
                        name="info"
                        onChange={(e) => {
                          setProductDetail({
                            ...productDetail,
                            productInfo: e.target.value,
                          });
                        }}
                        className="w-4/5 border"
                        value={product.productInfo}
                        style={{
                          pointerEvents: "all",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end w-full m-2 h-1/6">
                    <Link
                      to={`/team/${teamNo}/product/${product.productId}`}
                      key={product.productId}
                    >
                      <div className="box-border flex justify-end mr-3 text-xl font-bold text-blue-500">
                        작품 상세 정보
                      </div>
                    </Link>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소하기</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      console.log(productDetail);
                      // // create product
                      updateProduct(productDetail);
                    }}
                  >
                    편집하기
                  </AlertDialogAction>
                  {/* FIXME 해당 생성하기는 추후 작품 생성 기능 구현 */}
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
}
