import * as React from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'subtle'
type Size = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]/40 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white shadow-md hover:shadow-lg hover:from-[var(--accent-blue-hover)] hover:to-[var(--accent-purple-hover)]',
  secondary:
    'bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:bg-[var(--surface-tertiary)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5',
  outline:
    'bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] hover:bg-white/5',
  subtle:
    'bg-[var(--surface-primary)]/70 text-[var(--text-primary)] hover:bg-[var(--surface-primary)]/90 border border-[var(--border-primary)]/60 backdrop-blur'
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
  icon: 'h-9 w-9 text-sm'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
