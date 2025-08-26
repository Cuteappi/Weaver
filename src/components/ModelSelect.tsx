import * as React from 'react'

const STORAGE_KEY = 'weaver.chat.model'

const MODELS = [
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { id: 'gpt-4o-mini', label: 'GPT‑4o mini' },
  { id: 'claude-3-haiku', label: 'Claude 3 Haiku' },
]

export function ModelSelect() {
  const [model, setModel] = React.useState<string>(MODELS[0].id)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setModel(saved)
    } catch {
      // ignore SSR/localStorage issues
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value
    setModel(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[var(--text-muted)]">Model</span>
      <select
        value={model}
        onChange={onChange}
        className="rounded-md border px-2 py-1 text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklab, var(--surface-primary) 70%, transparent)',
          color: 'var(--text-primary)',
          boxShadow: '0 0 0 0 rgba(0,0,0,0)'
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent)'
          e.currentTarget.style.borderColor = 'var(--primary)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        {MODELS.map((m) => (
          <option key={m.id} value={m.id} className="bg-[var(--surface-secondary)] text-[var(--text-primary)]">
            {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}
