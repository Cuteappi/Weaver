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
    } catch (e) {
      // ignore SSR/localStorage issues
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value
    setModel(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400">Model</span>
      <select
        value={model}
        onChange={onChange}
        className="rounded-md border bg-slate-700/50 px-2 py-1 text-xs text-white focus:bg-slate-600/50 focus:border-blue-500 transition-all duration-200"
        style={{ borderColor: 'var(--border)' }}
      >
        {MODELS.map((m) => (
          <option key={m.id} value={m.id} className="bg-slate-800 text-white">
            {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}
