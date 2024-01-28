import { PageLayout } from "./PageLayout"
import UserSidebar from "@/components/sidebar/UserSidebar"
import DefaultHeader from "@/components/header/DefaultHeader"

export function MainLayout(props) {
 
    if (props.order === 'horizon') {
      // 가로 방향 페이지
      return (
        <div className="box-border">
          <div className="flex flex-row box-border">
            <UserSidebar />
            <PageLayout>

            </PageLayout>
            {/* TODO 사이드바 배치여부에 따른 body 크기 배분 (임시)*/}
          </div>
        </div>
      )
    }
    else {
      // 세로 방향 페이지
      return (
        <div className="flex flex-col w-[99vw] h-[99vh] box-border">
          <header>
            <DefaultHeader />
          </header>
          <body className="box-border flex justify-center">
            <PageLayout />
            {/* TODO 헤더 배치여부에 따른 body 크기 배분 */}
          </body>
        </div>
      )

    }


}