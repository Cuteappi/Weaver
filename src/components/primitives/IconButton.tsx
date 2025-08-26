import * as React from 'react'
import { cn } from '@/lib/cn'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}

const variantMap = {
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5',
  outline: 'border border-[var(--border-primary)] bg-transparent text-[var(--text-secondary)] hover:bg-white/5',
  primary: 'bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white hover:from-[var(--accent-blue-hover)] hover:to-[var(--accent-purple-hover)]'
}

const sizeMap = {
  sm: 'h-8 w-8 text-[13px]',
  md: 'h-9 w-9 text-sm',
  lg: 'h-10 w-10 text-base'
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]/40', variantMap[variant], sizeMap[size], className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = 'IconButton'
