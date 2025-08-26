import * as React from 'react'
import { cn } from '@/lib/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={cn(
					'w-full rounded-md border border-[var(--border-primary)] bg-[var(--surface-primary)]/70 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
					'px-3 py-2 shadow-inner backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]/30 focus:border-[var(--accent-purple)] transition-colors',
					className
				)}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'
