import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

import { Hero } from '@/components/Hero'
import { ModelSelect } from '@/components/ModelSelect'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  ts: number
}

const STORAGE_KEY = 'weaver.chat.messages'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

export function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState('')
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // Load from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[]
        setMessages(parsed)
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  // Persist to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (e) {
      // ignore
    }
  }, [messages])

  // Auto-scroll to bottom on new message
  React.useEffect(() => {
    const node = listRef.current
    if (node) {
      node.scrollTop = node.scrollHeight
    }
  }, [messages])

  function addMessage(role: ChatMessage['role'], content: string) {
    const msg: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role,
      content: content.trim(),
      ts: Date.now(),
    }
    setMessages((prev) => [...prev, msg])
  }

  function localAssistantResponse(userText: string): string {
    const trimmed = userText.trim()
    if (!trimmed) return ""
    // Simple local logic: echo with stats
    const words = trimmed.split(/\s+/).length
    const chars = trimmed.length
    return `You said: "${trimmed}"\nWords: ${words}, Chars: ${chars}. (Local stub response)`
  }

  async function onSend(e?: React.FormEvent) {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return

    addMessage('user', text)
    setInput('')

    // Simulate local-only assistant
    await new Promise((r) => setTimeout(r, 200))
    const reply = localAssistantResponse(text)
    if (reply) addMessage('assistant', reply)
  }

  return (
    <main className="min-h-[100vh] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="grid md:grid-cols-[260px_1fr] min-h-[100vh]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col justify-between border-r p-4 bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col gap-3">
            <div className="px-1 text-sm font-semibold text-white">Weaver</div>
            <button
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-2 text-sm text-left text-white font-medium shadow-lg transition-all duration-200"
              onClick={() => setMessages([])}
            >
              New Chat
            </button>
            <div>
              <input
                placeholder="Search your threads..."
                className="w-full text-sm rounded-md border px-3 py-2 bg-slate-800/50 text-white placeholder:text-slate-400 focus:bg-slate-700/50 focus:border-blue-500 transition-all duration-200"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div className="mt-2 text-xs uppercase tracking-wide text-slate-400 px-1">Older</div>
            <nav className="flex flex-col gap-1">
              {["Welcome to Weaver", "FAQ"].map((t) => (
                <a key={t} className="rounded-md px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                   href="#"
                >
                  {t}
                </a>
              ))}
            </nav>
          </div>
          <div className="px-1 text-sm">
            <a href="#" className="text-slate-400 hover:text-blue-400 underline hover:no-underline transition-colors duration-200">Login</a>
          </div>
        </aside>

        {/* Main content */}
        <section className="relative p-4 md:p-8 flex flex-col gap-6 max-w-4xl w-full mx-auto">

          {/* Messages / Hero */}
          <div
            ref={listRef}
            className="flex-1 min-h-[60vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {messages.length === 0 ? (
                <Hero />
              ) : null}
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="text-center text-[11px] text-slate-500 mt-8">
            Make sure you agree to our <a className="underline hover:text-blue-400 transition-colors" href="#">Terms</a> and our <a className="underline hover:text-blue-400 transition-colors" href="#">Privacy Policy</a>
          </div>

          {/* Composer */}
          <form onSubmit={onSend} className="flex flex-col gap-2 mt-4">
            <div className="flex items-end gap-2 rounded-2xl border p-2 md:p-3 bg-slate-800/60 backdrop-blur-sm shadow-xl"
              style={{ borderColor: 'var(--border)' }}
            >
              <button type="button" className="rounded-md p-2 text-slate-400 hover:text-blue-400 transition-colors duration-200"
                title="Attach file"
              >📎</button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void onSend()
                  }
                }}
                placeholder="Type your message here..."
                rows={2}
                className="flex-1 resize-none rounded-md px-2 py-1 md:px-3 md:py-2 text-sm md:text-base bg-transparent outline-none text-white placeholder:text-slate-400 focus:placeholder:text-slate-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-200 transform hover:scale-105"
                title="Send"
              >
                ↑
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <ModelSelect />
              <span>Shift + Return to add a new line</span>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'
  return (
    <div className={
      'flex w-full ' + (isUser ? 'justify-end' : 'justify-start')
    }>
      <div
        className={
          'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words border ' +
          (isUser
            ? 'ml-8'
            : 'mr-8')
        }
        style={{
          backgroundColor: isUser ? 'var(--primary)' : 'var(--card)',
          color: isUser ? 'var(--primary-foreground)' : 'var(--card-foreground)',
          borderColor: 'var(--border)'
        }}
      >
        {msg.content}
      </div>
    </div>
  )
}
