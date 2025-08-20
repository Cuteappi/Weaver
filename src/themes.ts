export type ThemeVars = Record<string, string>
export type Theme = { name: string; colors: ThemeVars }

export const lightTheme: Theme = {
	name: 'light',
	colors: {
		background: '#ffffff',
		foreground: '#0b0b0b',
		muted: '#6b7280',
		primary: '#3b82f6',
		'primary-foreground': '#ffffff',
		border: '#e5e7eb',
		card: '#ffffff',
		'card-foreground': '#0b0b0b',
	},
}

export const darkTheme: Theme = {
	name: 'dark',
	colors: {
		background: '#0b0b0b',
		foreground: '#f5f5f5',
		muted: '#9ca3af',
		primary: '#60a5fa',
		'primary-foreground': '#0b0b0b',
		border: '#262626',
		card: '#111113',
		'card-foreground': '#f5f5f5',
	},
}
