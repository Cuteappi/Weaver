import * as React from 'react'
import { ThemeController } from '@/components/ThemeController'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { darkTheme, lightTheme } from '@/themes'

export function ThemeRoot({ children }: { children: React.ReactNode }) {
	const [themeName, setThemeName] = React.useState<'light' | 'dark'>('light')

	// initialize from storage or system preference on client
	React.useEffect(() => {
		const stored = localStorage.getItem('weaver.theme.name') as 'light' | 'dark' | null
		if (stored === 'light' || stored === 'dark') {
			setThemeName(stored)
			return
		}
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		setThemeName(prefersDark ? 'dark' : 'light')
	}, [])

	const onToggle = React.useCallback(() => {
		setThemeName((prev) => {
			const next = prev === 'dark' ? 'light' : 'dark'
			localStorage.setItem('weaver.theme.name', next)
			return next
		})
	}, [])

	const theme = themeName === 'dark' ? darkTheme : lightTheme

	return (
		<>
			<ThemeController theme={theme} />
			{children}
			<ThemeSwitcher themeName={themeName} onToggle={onToggle} />
		</>
	)
}
