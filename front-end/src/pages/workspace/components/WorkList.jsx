import { BookPlus } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { PlusCircleIcon } from "lucide-react";
import useTeamQueryModule from "@/hook/useTeamQueryModule";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useProductQueryModule from "@/hook/useProductQueryModule";
import Buttonselect from "./selects/ButtonSelect";
import RadioButtonSelect from "./selects/RadioButtonSelect";
import ImageUploader from "@/pages/product/components/ImageUploader";

function CreateWork() {
  return (
    <Card className="flex items-center justify-center w-32 border-dashed h-36">
      <BookPlus color="#909090" />
    </Card>
  );
}

function WorkList({ title, info, productsId, onChange, onCreate }) {
  const [productDetail, setProductDetail] = useState({
    productTitle: "",
    productInfo: "",
    category: {
      // "id": 1,
      // "name": "웹소설"
    },
    genres: [
      {
        // "id": 1,
        // "name": "SF"
      },
    ],
    uploadImage: "",
  });

  const { teamData, getTeamsIsSuccess } = useTeamQueryModule();
  const [teamNo, setTeamNo] = useState("");

  useEffect(() => {
    if (teamData) {
      setTeamNo(() => teamData[0].id);
      console.log("team?", teamNo);
    }
  }, [teamData, teamNo]);

  // FIXME 팀 ID undefined 발생
  const { createProductData } = useProductQueryModule(teamNo);
  // console.log(teamId)

  return (
    <AlertDialog className="w-full h-full">
      <div>
        <AlertDialogTrigger>
          <Card className="flex items-center justify-center w-32 border h-36">
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
              <ImageUploader className="w-max, h-max" />
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
                    setProductDetail({ ...productDetail, productTitle: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row w-full m-2">
              <div className="box-border w-1/6 mr-3 text-xl">장르</div>
              <div className="box-border flex flex-wrap w-5/6 gap-2">
                <Buttonselect className="w-full" />
              </div>
            </div>
            <div className="flex flex-row w-full m-2">
              <div className="box-border w-1/6 mr-3 text-xl">분류</div>
              <div className="box-border flex flex-wrap w-5/6 gap-2">
                <RadioButtonSelect />
              </div>
            </div>
            <div className="flex flex-row w-full m-2">
              <div className="box-border w-1/6 mr-3 text-xl">설명</div>
              <div className="box-border w-5/6">
                <input
                  name="info"
                  onChange={(e) => {
                    setProductDetail({ ...productDetail, productInfo: e.target.value });
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
  );
}

export default WorkList;
