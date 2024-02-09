import { Card } from "@/components/ui/card";
import { BookPlus } from "lucide-react";
import { Link } from "react-router-dom";

function CreateProduct() {
  return (
    <div className="flex flex-col items-center">
      <Card className="flex items-center justify-center w-32 mx-3 my-1 border-2 border-dashed h-36">
        <BookPlus color="#909090" />
      </Card>
      <div className="m-2"></div>
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

export default function ProductList({ products }) {
  const teamId = 1;
  return (
    <div className="flex flex-wrap h-full ">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
        <CreateProduct />
      </div>

      {products.map((product) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={product.productId}>
          <Link to={`/team/${teamId}/product/${product.productId}`} key={product.productId}>
            <Product productImg={product.productImg} productName={product.productName} />
          </Link>
        </div>
      ))}
    </div>
  );
}
