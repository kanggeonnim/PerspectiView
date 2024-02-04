import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  font-semibold  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary-accent",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          " border shadow-sm border-input bg-background hover:bg-secondary-accent hover:text-secondary-foreground",
        // "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        gray: "border border-input bg-gray-200 shadow-sm hover:bg-accent hover:text-accent-foreground font-semibold",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        indigo:
          "text-primary-foreground font-semibold shadow hover:text-accent-foreground hover:bg-indigo-200 bg-indigo-700",
        kakao:
          "text-secondary-foreground font-semibold shadow hover:text-accent-foreground hover:bg-yellow-400/80 bg-yellow-300",
        google: "text-secondary-foreground font-semibold shadow hover:bg-secondary-accent",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
