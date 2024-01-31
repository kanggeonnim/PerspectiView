import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        off : "text-black bg-gray-300 border-transparent shadow"
      },
      radius: {
        default: "rounded-md",
        sm: "rounded",
        lg: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
    },

    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  }
);

function Badge({ className, variant, radius, ...props }) {
  return <div className={cn(badgeVariants({ variant, radius }), className)} {...props} />;
}

export { Badge, badgeVariants };
