import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card"


// type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>복선</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex-1 space-y-1 p-2">
          {/* 아이콘 위치 */}
          <p className="text-sm font-medium leading-none">
            Push Notifications
          </p>
          
        </div>
        <div className="flex-1 space-y-1 p-2">
          {/* 아이콘 위치 */}
          <p className="text-sm font-medium leading-none">
            Push Notifications
          </p>
          
        </div>
      </CardContent>
      
    </Card>
  )
}
