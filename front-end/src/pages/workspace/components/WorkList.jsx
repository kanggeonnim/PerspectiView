/* eslint-disable react/jsx-key */
import { BookPlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductDetail from "./ProductDetail";
import { PlusCircleIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import useProductQueryModule from "@/hook/useProductQueryModule";

function CreateWork() {
  return (
    <Card className="flex items-center justify-center w-32 border-dashed h-36">
      <BookPlus color="#909090" />
    </Card>
  );
}

// function EachWork({ url, title }) {
//   return (
//     <div className="flex flex-col items-center ">
//       <Card className="w-32 h-36 ">
//         <img
//           className="w-full h-full rounded-xl"
//           src={url}
//           alt="cover of work"
//         />
//       </Card>
//       <div className="m-2">{title}</div>
//     </div>
//   );
// }

function OneButtonselect() {
  const arr = [
    { id: 1, name: "드라마" },
    { id: 2, name: "로맨스" },
    { id: 3, name: "느와르" },
    { id: 4, name: "스릴러" },
    { id: 5, name: "SF" },
  ];
  const [pick, setPick] = useState(arr);
  const [select, setSelect] = useState([]);

  return pick.map((item) => (
    <div key={item.id}>
      <Badge
        onClick={() => {
          !select.includes(item)
            ? setSelect((select) => [...select, item])
            : setSelect(select.filter((button) => button !== item));
        }}
        variant={select.includes(item) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}

function RadioSelect() {
  const arrs = [
    { id: 1, name: "웹소설" },
    { id: 2, name: "시나리오" },
    { id: 3, name: "웹툰 스토리" },
    { id: 4, name: "게임 스토리" },
    { id: 5, name: "에세이" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="box-border flex flex-wrap w-5/6 gap-2">
      {arrs.map((arr) => (
        <label key={arr.id}>
          <Badge variant={selectedOption === `option${arr.id}` ? "destructive" : "off"}>
            <input
              type="radio"
              value={`option${arr.id}`}
              checked={selectedOption === `option${arr.id}`}
              onChange={handleOptionChange}
              className="hidden"
            />
            {arr.name}
          </Badge>
        </label>
      ))}
    </div>
  );
}

function WorkList({ title, info, onChange, onCreate }) {
  const { teamId } = useParams();
  const [productDetail, setProductDetail] = useState({
    productTitle: "",
    productInfo: "",
    category: null,
    genres: [],
    uploadImage: "",
  });

  const { createProduct } = useProductQueryModule(teamId);

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
              <PlusCircleIcon />
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
                <OneButtonselect className="w-full" />
              </div>
            </div>
            <div className="flex flex-row w-full m-2">
              <div className="box-border w-1/6 mr-3 text-xl">분류</div>
              <div className="box-border flex flex-wrap w-5/6 gap-2">
                <RadioSelect />
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
                createProduct(productDetail);
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
