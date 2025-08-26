export interface AvatarProps {
	label?: string
	className?: string
}

export function Avatar({ label, className }: AvatarProps) {
	const letter = (label || 'G').trim()[0]?.toUpperCase() || 'G'
	return (
		<div
			className={(
				'h-7 w-7 rounded-full ring-1 ring-white/10 shadow flex items-center justify-center text-[11px] ' +
				(className || '')
			).trim()}
			style={{ background: 'color-mix(in oklab, var(--primary) 20%, transparent)' }}
			aria-hidden
		>
			{letter}
		</div>
	)
}

export default Avatar
