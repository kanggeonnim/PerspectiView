import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const layoutVariants = cva("flex w-screen h-screen items-center justify-between", {
  variants: {
    variant: {
      vertical: "flex-col",
      horizontal: "flex-row ",
    },
  },
  defaultVariants: {
    variant: "vertical",
  },
});

const MainLayout = React.forwardRef(({ className, children, variant, ...props }, ref) => {
  return (
    <div className={cn(className, layoutVariants({ variant }))} ref={ref} {...props}>
      {children}
    </div>
  );
});
MainLayout.displayName = "MainLayout";

export { MainLayout };

// export function MainLayout({ order, children, isProduct }) {
//   if (order === "horizon") {
//     // 가로 방향 페이지
//     return (
//       <div className="flex flex-row w-[99vw] h-[99vh] box-border">
//         <div>
//           {isProduct ? <ProductSidebar /> : <UserSidebar />}
//         </div>
//         <div>
//           {/* BODY를 여기로 */}
//           {children}
//         </div>
//       </div>
//     );
//   } else {
//     // 세로 방향 페이지
//     return (
//       <div className="flex flex-col w-[99vw] h-[99vh] box-border">
//         <header>
//           <DefaultHeader />
//         </header>
//         <body className="box-border flex justify-center">
//           <PageLayout />
//         </body>
//       </div>
//     );
//   }
// }
