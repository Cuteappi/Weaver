import * as React from 'react'
import { cn } from '@/lib/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'ghost'
}

const base = 'w-full rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors resize-none focus-visible:outline-none'
const variants: Record<NonNullable<TextareaProps['variant']>, string> = {
  default:
    'min-h-[80px] border border-[var(--border-primary)] bg-[var(--surface-primary)]/70 px-3 py-2 shadow-inner backdrop-blur focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]/30 focus:border-[var(--accent-purple)]',
  ghost:
    'min-h-[44px] bg-transparent border-0 px-0 py-2 focus-visible:ring-0 focus:border-transparent',
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'
