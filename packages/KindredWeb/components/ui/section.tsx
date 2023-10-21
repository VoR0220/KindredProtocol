import * as React from "react"

import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-sm mb-8 last:mb-24",
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
