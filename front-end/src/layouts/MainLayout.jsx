import ProductSidebar from "@/components/sidebar/ProductSidebar";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { PageLayout } from "./PageLayout";
import DefaultHeader from "@/components/header/DefaultHeader";

export function MainLayout({ order, children, isProduct }) {
  if (order === "horizon") {
    // 가로 방향 페이지
    return (
      <div className="flex flex-row w-[99vw] h-[99vh] box-border">
        <div>
          {/* TODO 사이드바를 여기에 (sj 코드 변경)*/}
          {isProduct ? <ProductSidebar /> : <UserSidebar />}
        </div>
        <div>
          {/* BODY를 여기로 */}
          {children}
        </div>
      </div>
    );
  } else {
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
    );
  }
}
