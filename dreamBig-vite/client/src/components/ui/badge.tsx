
import * as React from "react"
import { cva as classVarianceAuthority, type VariantProps } from "class-variance-authority"

import { classNameMerger } from "@/lib/utils"

const badgeVariants = classVarianceAuthority(
  // Base styles: inline-flex layout, rounded corners, small padding, no text wrapping
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate " ,
  {
    variants: {
      variant: {
        // Default: Uses primary theme color with shadow
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        // Secondary: Uses secondary theme color
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        // Destructive: For error/warning states
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",

        // Outline: Border only, no background fill
        outline: " border [border-color:var(--badge-outline)] shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={classNameMerger(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants }
/**
 * Badge Component
 * 
 * A small UI element used to display labels, tags, or status indicators.
 * 
 * How it works:
 * 1. Uses CVA (Class Variance Authority) to manage different badge styles
 * 2. Base classes: inline-flex, rounded, small padding, prevents text wrapping
 * 3. Variants: default (primary color), secondary, destructive, outline
 * 4. Automatically applies theme colors from CSS variables
 * 
 * Usage:
 * <Badge variant="default">New</Badge>
 * <Badge variant="secondary">Available</Badge>
 * <Badge variant="destructive">Error</Badge>
 */