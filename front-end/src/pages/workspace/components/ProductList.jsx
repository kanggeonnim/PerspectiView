import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import WorkList from "./WorkList";
import useProductAddStore from "@/store/useProductAddStore";

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

export default function ProductList({ productsdata }) {
  const { inputs, setInputs, products, setProducts, onCreate } = useProductAddStore();
  console.log(products);
  return (
    <div className="flex flex-wrap h-full ">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
        <CreateProduct />
      </div>

      {productsdata?.map((product) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={product.productId}>
          <Link to={`/product/${product.productId}`} key={product.productId}>
            <Product productImg={product.productImageUrl} productName={product.productTitle} />
          </Link>
        </div>
      ))}
      {/* FIXME 아래는 POST가 안되서 임시로 만듬, POST 확인시 삭제 */}
      {products.map((prod, index) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
          <Link to={`/product/${prod.id}`} key={prod.id}>
            <Product productImg={prod.url} productName={prod.name} />
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
