import UserSidebar from "@/components/sidebar/UserSidebar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/layouts/MainLayout"
import { PageLayout } from "@/layouts/PageLayout"
import { Badge } from "@/components/ui/badge"
import { ForeshadowingCard } from "@/components/card/ForeshadowingCard"

export default function ForeshadowingPage() {

  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <PageLayout className="">
        <Card className="box-border p-3 h-3/4">
          <CardTitle className="box-border m-4 text-3xl">
            복선 목록
          </CardTitle>
          <CardContent className="box-border flex flex-row justify-around gap-4 px-12 h-5/6">
            <div className="flex flex-col items-center w-1/3">
              <div className="box-border flex justify-start w-full gap-3 m-4">
                <h3 className="text-xl font-semibold">미 회수 복선</h3>
                <Badge className="text-yellow-700 bg-yellow-300 rounded-full">
                  2
                  {/* FIXME 임시 입력 숫자 */}
                </Badge>
              </div>
              <div className="flex flex-col items-center w-full h-full m-2 overflow-y-auto">
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
              </div>
              
            </div>
            <div className="flex flex-col items-center w-1/3">
              <div className="box-border flex justify-start w-full gap-3 m-4">
                <h3 className="text-xl font-semibold">사용 중인 복선</h3>
                <Badge className="text-red-700 bg-red-200 rounded-full">
                  2
                  {/* FIXME 임시 입력 숫자 */}
                </Badge>
              </div>
              <div className="flex flex-col items-center w-full h-full m-2 overflow-y-auto">
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
              <div className="box-border flex justify-start w-full gap-3 m-4">
                <h3 className="text-xl font-semibold">회수 된 복선</h3>
                <Badge className="text-purple-700 bg-purple-200 rounded-full">
                  2
                  {/* FIXME 임시 입력 숫자 */}
                </Badge>
              </div>
              <div className="flex flex-col items-center w-full h-full m-2 overflow-y-auto">
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
                <ForeshadowingCard />
              </div>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    </MainLayout>
  )
  
}