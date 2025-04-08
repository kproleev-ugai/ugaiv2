"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const AvatarGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, 4)
  const remainingCount = childrenArray.length - visibleChildren.length

  return (
    <div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
      {visibleChildren.map((child, index) => (
        <div key={index} className="relative inline-block border-2 border-background rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative inline-block bg-muted text-muted-foreground flex items-center justify-center h-8 w-8 rounded-full border-2 border-background text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  )
})
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }

