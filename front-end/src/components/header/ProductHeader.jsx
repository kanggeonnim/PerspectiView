import { Badge } from "@/components/ui/badge";
import ReadMore from "@/components/ReadMore";
import { useProductStore } from "@/store/useProductStore";

export default function ProductHeader() {
  const { product } = useProductStore();

  return (
    <>
      <header className="w-full border rounded shadow-md">
        <nav
          className="flex flex-col items-center justify-between p-3 mx-auto "
          aria-label="Global"
        >
          <div className="flex items-center justify-between w-full my-2 ">
            {/* 작품 */}
            <div className="flex ">
              <div className="px-6 text-sm font-semibold leading-6 text-gray-900 min-w-24">
                작품명
              </div>

              <div className="w-full">{product?.productTitle}</div>
            </div>

            <div className="flex items-center justify-between ">
              {/* 장르 */}
              <div className="flex ">
                <div className="px-6 text-sm font-semibold leading-6 text-gray-900 min-w-20">
                  장르
                </div>
                <div className="flex items-center justify-between mx-auto space-x-2">
                  {product?.genres?.map((genre, key) => (
                    <Badge key={key} variant="destructive" radius="full">
                      {genre.genreName}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 분류 */}
              <div className="flex ">
                <div className="px-6 text-sm font-semibold leading-6 text-gray-900 min-w-20">
                  분류
                </div>
                <div className="flex items-center justify-between mx-auto space-x-2">
                  <Badge className="text-stone-100 bg-badge" radius="full">
                    {product?.category.name}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full my-2 ">
            {/* 설명 */}
            <div className="flex w-full">
              <div className="px-6 text-sm font-semibold leading-6 text-gray-900 min-w-24">
                설명
              </div>

              <div className="w-full ">
                <ReadMore>{product?.productInfo}</ReadMore>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
