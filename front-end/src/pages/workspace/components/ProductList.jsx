import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircleIcon } from "lucide-react";
import { BookPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WorkList from "./WorkList";
import { privateApi } from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useProductAddStore from "@/store/useProductAddStore";

function CreateProduct() {
  const {
    inputs,
    setInputs,
    products,
    setProducts,
    setSelectedIdx,
    onCreate
  } = useProductAddStore();


  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="flex flex-col items-center">
      <WorkList 
      title={inputs.productTitle}
      info={inputs.productInfo}
      onChange={onChange}
      onCreate={onCreate}
        />
    </div>
  );
}
// const useTest  = () => {
//   const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
//     queryKey: ["product"],
//     queryFn: async () => {
//       const response = await privateApi.post(`/api/team/3/product`, 
      

//       );
//       console.log(response);
//       return response.data.response;
//     },
//   });

//   return { productData, getProductIsSuccess };
// };


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

export default function ProductList({ productsdata }) {
  const {
    inputs,
    setInputs,
    products,
    setProducts,
    setSelectedIdx,
    onCreate
  } = useProductAddStore();

  return (
    <div className="flex flex-wrap h-full ">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
        <CreateProduct />
      </div>

      {productsdata.map((product) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          key={product.productId}
        >
          <Link to={`/product/${product.productId}`} key={product.productId}>
            <Product
              productImg={product.productImageUrl}
              productName={product.productTitle}
            />
          </Link>
        </div>
      ))}
      {/* FIXME 아래는 POST가 안되서 임시로 만듬, POST 확인시 삭제 */}
      {products.map((prod) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          key={prod.productId}
        >
          <Link to={`/product/${prod.productId}`} key={prod.productId}>
            <Product
              productImg={prod.url}
              productName={prod.productTitle}
            />
          </Link>
        </div>
      ))}
      {/* {products.map((product) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          key={product.productId}
        >
          <Link to={`/product/${product.productId}`} key={product.productId}>
            <Product
              productImg={product.productImg}
              productName={product.productName}
            />
          </Link>
        </div>
      ))} */}
      {/* FIXME 예시 이미지  */}
    </div>
  );
}
