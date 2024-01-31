import { BookPlus } from "lucide-react";
import { Link } from "react-router-dom";
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

const works = [
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 4, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 5, url: "https://picsum.photos/200/300", title: "mywork" },
];

function CreateWork() {
  return (
    <Card className="flex items-center justify-center w-32 border-dashed h-36">
      <BookPlus color="#909090" />
    </Card>
    // TODO 여기에 이벤트
  );
}

// function Modal() {

//   const [modalOpen, setModalOpen] = useState(false);

//   const showModal = () => {
//     setModalOpen(true);
//   }

//   return (
//     <Card onClick={showModal} className="flex items-center justify-center w-32 border-dashed h-36">
//       {modalOpen && <ProductDetail setModalOpen={setModalOpen} />}
//       <BookPlus color="#909090" />
//     </Card>
//   )
// }

function EachWork({ url, title }) {
  return (
    <div className="flex flex-col items-center ">
      <Card className="w-32 h-36 ">
        <img
          className="w-full h-full rounded-xl"
          src={url}
          alt="cover of work"
        />
      </Card>
      <div className="m-2">{title}</div>
    </div>
  );
}

function WorkList({ isDetail }) {
  return (
    <div className="flex flex-wrap w-full h-screen p-6 gap-x-10 gap-y-20">
      <AlertDialog className="w-full h-full">
        <div>
          <AlertDialogTrigger>
            <Card className="flex items-center justify-center w-32 border-dashed h-36">
              <BookPlus color="#909090" />
            </Card>
          </AlertDialogTrigger>
        </div>
        <AlertDialogContent className="flex flex-row w-2/3 max-w-2/3 h-2/3">
          <div className="box-border flex flex-col w-1/4 h-full p-3 m-3">
            <AlertDialogHeader className="flex flex-col w-full h-full">
              <CardTitle className="text-2xl">
                {isDetail ? <div>작품 조회</div> : <div>작품 생성</div>}
              </CardTitle>  
              <div className="flex items-center justify-center w-2/3 my-3 bg-gray-300 border h-1/2">
                {isDetail ? <></> : <PlusCircleIcon />}
              </div>
            </AlertDialogHeader>
          </div>
          <div className="box-border flex flex-col w-2/3 h-full p-3">
            <div className="flex flex-col justify-around w-full h-5/6">
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">작품명</div>
                <div className="box-border w-5/6">
                  {isDetail ? (
                    <div>일이삼사</div>
                  ) : (
                    <input type="text" className="border" />
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">장르</div>
                <div className="box-border flex flex-wrap w-5/6 gap-2">
                  <Badge variant="destructive">123</Badge>
                  <Badge className="font-semibold text-black bg-gray-400">
                    123
                  </Badge>
                  {/* FIXME 임시 클릭으로 변경 계획중 */}
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">분류</div>
                <div className="box-border flex flex-wrap w-5/6 gap-2">
                  <Badge variant="destructive">123</Badge>
                  <Badge className="font-semibold text-black bg-gray-400">
                    123
                  </Badge>
                  {/* FIXME 임시 클릭으로 변경 계획중 */}
                </div>
              </div>
              <div className="flex flex-row w-full m-2">
                <div className="box-border w-1/6 mr-3 text-xl">설명</div>
                <div className="box-border w-5/6">
                  하나둘삼넷오여섯칠팔아홉공 수신감명도삼삼
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>취소하기</AlertDialogCancel>
              <AlertDialogAction>생성하기</AlertDialogAction>
              {/* FIXME 해당 생성하기는 추후 작품 생성 기능 구현 */}
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {works.map((work, index) => (
        <Link to={`/product/${index}`} key={index}>
          <EachWork url={work.url} title={work.title} />
        </Link>
      ))}
    </div>
  );
}

export default WorkList;
