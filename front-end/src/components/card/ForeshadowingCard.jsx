import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import Check from "@/assets/Icon.svg"
import Book from "@/assets/OpenBook.svg"

export function CardDemo({ className }) {
  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <CardTitle>복선 
          {/* TODO
            '복선' text 입력 위치에 제목 내용 받아와 출력 */}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex space-y-1 p-2">
          <img src={Book} className="mr-2" />
          <p className="text-sm font-medium leading-none ">
            내용

            {/* TODO
            '내용' text 입력 위치에 복선 내용 받아와 출력 */}
          </p>
          
        </div>
        <div className="flex space-y-1 p-2">
          <img src={Check} className="mr-2" />
          <p className="text-sm font-medium leading-none">
            언급된 스토리
          </p>
          {/* TODO 
          여기에 언급된 스토리 넣기 
          */}
          
        </div>
      </CardContent>
      
    </Card>
  )
}
