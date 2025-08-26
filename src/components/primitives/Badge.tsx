import * as React from 'react'
import { cn } from '@/lib/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide',
        variant === 'default'
          ? 'bg-white/10 text-[var(--text-secondary)] border border-[var(--border-primary)]/60'
          : 'bg-transparent text-[var(--text-secondary)] border border-[var(--border-primary)]',
        className
      )}
      {...props}
    />
  )
}
