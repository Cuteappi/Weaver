export function ThemeSwitcher({
	themeName,
	onToggle,
	disabled = false,
}: {
	themeName: 'light' | 'dark'
	onToggle: () => void
	disabled?: boolean
}) {
	return (
		<button
			type="button"
			onClick={onToggle}
			disabled={disabled}
			className="fixed top-3 right-3 rounded px-3 py-1.5 text-sm border"
			style={{
				background: 'var(--card)',
				color: 'var(--card-foreground)',
				borderColor: 'var(--border)'
			}}
			aria-label="Toggle theme"
			title={`Switch to ${themeName === 'dark' ? 'light' : 'dark'} theme`}
		>
			{themeName === 'dark' ? '🌙 Dark' : '☀️ Light'}
		</button>
	)
}
