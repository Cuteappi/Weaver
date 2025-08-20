import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { applyThemeVars, getInitialThemeName, loadTheme, persistThemeName } from '@/lib/theme'

export type ThemeContextValue = {
	themeName: string
	setThemeName: (name: string) => void
	isLoading: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [themeName, setThemeNameState] = useState<string>('light')
	const [isLoading, setIsLoading] = useState(true)

	const setThemeName = useCallback((name: string) => {
		setThemeNameState(name)
		persistThemeName(name)
	}, [])

	useEffect(() => {
		const initial = getInitialThemeName()
		setThemeNameState(initial)
	}, [])

	useEffect(() => {
		let cancelled = false
		async function run() {
			setIsLoading(true)
			try {
				const theme = await loadTheme(themeName)
				if (cancelled) return
				applyThemeVars(theme.colors)
				document.documentElement.dataset.theme = theme.name
			} finally {
				if (!cancelled) setIsLoading(false)
			}
		}
		run()
		return () => {
			cancelled = true
		}
	}, [themeName])

	const value = useMemo<ThemeContextValue>(() => ({ themeName, setThemeName, isLoading }), [themeName, setThemeName, isLoading])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const ctx = useContext(ThemeContext)
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
	return ctx
}
