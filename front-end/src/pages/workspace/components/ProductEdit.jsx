import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ProductEdit(){

  return (
    <Card className="flex flex-row w-2/3 h-4/5">
      <CardContent className="box-border flex flex-col w-1/3 h-full p-3 m-3 border-r">
        <CardTitle className="text-2xl">
          작품 편집
        </CardTitle>
        <div>
          Image
        </div>
      </CardContent>
      <CardContent className="box-border flex flex-col w-2/3 h-full p-3 ">
        <div className="flex flex-col justify-around w-full h-5/6">
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              작품명
            </div>
            <div className="box-border w-5/6">
              <input type="text" className="border" />
            </div>
          </div>
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              장르
            </div>
            <div className="box-border flex flex-wrap w-5/6">
              {/* 뱃지 */}
            </div>
          </div>
          <div className="flex flex-row w-full m-2"> 
            <div className="box-border w-1/6 mr-3 text-xl">
             분류
            </div>
            <div className="box-border w-5/6">
              {/* 뱃지 */}
            </div>
          </div>
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              설명
            </div>
            <div className="box-border w-5/6">
              <Textarea className="w-4/5"/>
            </div>
          </div>             
        </div>
        <CardFooter className="box-border flex justify-end w-full my-3 h-1/6">
          <Button className="w-1/6" variant="indigo">
            저장하기
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )

}