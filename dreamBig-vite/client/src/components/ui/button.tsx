import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva as classVarianceAuthority, type VariantProps } from "class-variance-authority"

import { classNameMerger } from "@/lib/utils"

const buttonVariants = classVarianceAuthority(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          // Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color.
          " border [border-color:var(--button-outline)]  shadow-xs active:shadow-none ",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border ",
        // Add a transparent border so that when someone toggles a border on later, it doesn't shift layout/size.
        ghost: "border border-transparent",
      },
      // Heights use min-height so buttons have consistent sizing with short text,
      // but can expand vertically to fit longer text content without breaking layout.
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={classNameMerger(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { buttonVariants, Button }

/**
 * Button Component
 * 
 * A versatile button with multiple style variants (default, destructive, outline, secondary, ghost)
 * and sizes (default, sm, lg, icon).
 * 
 * The `asChild` prop allows this button to render as ANY element while keeping the button styles.
 * This is useful when you need a link or custom element that looks like a button.
 * 
 * Slot (from Radix UI): A wrapper that passes props to its child without creating extra DOM elements.
 * When asChild=true, the button merges its styles into the child element instead of wrapping it.
 * 
 * Usage:
 * <Button>Normal Button</Button>
 * <Button asChild><a href="/page">Link as Button</a></Button>
 * <Button variant="destructive">Delete</Button>
 */