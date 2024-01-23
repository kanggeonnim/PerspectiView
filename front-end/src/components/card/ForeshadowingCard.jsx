import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import Check from "@/assets/Icon.svg"
import Book from "@/assets/OpenBook.svg"

// type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className }) {
  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <CardTitle>복선</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex space-y-1 p-2">
          <img src={Book} className="mr-2" />
          <p className="text-sm font-medium leading-none ">
            내용
          </p>
          
        </div>
        <div className="flex space-y-1 p-2">
          <img src={Check} className="mr-2" />
          <p className="text-sm font-medium leading-none">
            언급된 스토리
          </p>
          
        </div>
      </CardContent>
      
    </Card>
  )
}
