import * as React from 'react'
import { cn } from '@/lib/cn'

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-y-auto custom-scrollbar',
          className
        )}
        {...props}
      />
    )
  }
)
ScrollArea.displayName = 'ScrollArea'
