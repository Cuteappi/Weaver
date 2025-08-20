import { parse as parseToml } from 'toml'

export type ThemeVars = Record<string, string>
export type ThemeMeta = {
	name: string
	colors: ThemeVars
}

const THEME_STORAGE_KEY = 'weaver.theme.name'

export async function loadTheme(name: string): Promise<ThemeMeta> {
    const url = `${import.meta.env.BASE_URL ?? '/'}themes/${name}.toml`
    let res: Response
    try {
        res = await fetch(url, { cache: 'no-store' })
    } catch (e) {
        console.error('Theme fetch failed', { url, error: e })
        throw e
    }
    if (!res.ok) {
        console.error('Theme fetch non-OK', { url, status: res.status })
        throw new Error(`Failed to load theme: ${name}`)
    }
    const text = await res.text()
    const parsed = parseToml(text) as any
    return { name: parsed.name ?? name, colors: parsed.colors ?? {} }
}

export function applyThemeVars(vars: ThemeVars) {
	const root = document.documentElement
	for (const [k, v] of Object.entries(vars)) {
		root.style.setProperty(`--${k}`, v)
	}
}

export function getInitialThemeName(): string {
	return (
		localStorage.getItem(THEME_STORAGE_KEY) ||
		(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light')
	)
}

export function persistThemeName(name: string) {
	localStorage.setItem(THEME_STORAGE_KEY, name)
}
