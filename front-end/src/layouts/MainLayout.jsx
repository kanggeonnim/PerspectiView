import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const layoutVariants = cva("flex max-h-screen w-screen h-screen justify-between", {
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
