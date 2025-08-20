import * as React from 'react'
import type { Theme } from '@/themes'

function applyVars(vars: Record<string, string>) {
  const root = document.documentElement
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(`--${k}`, v)
  }
}

export function ThemeController({ theme }: { theme: Theme }) {
  React.useEffect(() => {
    applyVars(theme.colors)
    document.documentElement.dataset.theme = theme.name
  }, [theme])
  return null
}
