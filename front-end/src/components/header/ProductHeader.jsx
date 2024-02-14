import ReadMore from "@/components/ReadMore";
import { Badge } from "@/components/ui/badge";
import useExportModule from "@/hook/useExportModule";
import { useProductStore } from "@/store/useProductStore";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";

export default function ProductHeader() {
  const { product } = useProductStore();
  const { teamId, productId } = useParams();
  const { exportWordData } = useExportModule(teamId, productId);

  const onExportWord = (exportWordData, fileName = product?.productTitle) => {
    const url = window.URL.createObjectURL(
      new Blob([exportWordData], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
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
                    <Badge key={key} variant="destructive" radius="full" className="hover:none">
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
                    {product?.category?.categoryName}
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
            <Button
              onClick={() => onExportWord(exportWordData)}
              size="sm"
              className="bg-progress-foreground"
            >
              <FileDown size={15} className="mr-1" />
              내보내기
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
