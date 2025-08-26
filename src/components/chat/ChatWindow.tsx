import PromptInput from '@/components/chat/PromptInput'

export default function ChatWindow() {
    return (
        <div className="w-full h-full max-w-3xl mx-auto flex flex-col">
            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 md:space-y-5 pb-6 pr-1 pt-4 md:pt-6 px-2 md:px-3">
                {/* User message */}
                <div className="flex gap-3 justify-end items-start">
                    <div
                        className="rounded-2xl px-3.5 py-2.5 text-[var(--text-primary)] max-w-[72%] border shadow-sm"
                        style={{
                            background: 'color-mix(in oklab, var(--primary) 22%, transparent)',
                            borderColor: 'var(--border)'
                        }}
                    >
                        <p className="text-sm md:text-base leading-6">Hi Weaver!</p>
                    </div>
                    <div
                        className="h-8 w-8 shrink-0 rounded-full ring-1 ring-white/10"
                        style={{ background: 'color-mix(in oklab, var(--primary) 30%, transparent)' }}
                        aria-hidden
                    />
                </div>

                {/* Assistant message */}
                <div className="flex gap-3 items-start">
                    <div
                        className="h-8 w-8 shrink-0 rounded-full ring-1 ring-white/10"
                        style={{ background: 'color-mix(in oklab, var(--surface-tertiary) 100%, transparent)' }}
                        aria-hidden
                    />
                    <div
                        className="rounded-2xl px-3.5 py-2.5 text-[var(--text-primary)] max-w-[72%] border shadow-sm"
                        style={{
                            background: 'color-mix(in oklab, var(--surface-secondary) 85%, transparent)',
                            borderColor: 'var(--border)'
                        }}
                    >
                        <p className="text-sm md:text-base leading-6">Hello! How can I help you today?</p>
                    </div>
                </div>

            </div>
            <PromptInput />
        </div>
    )
}

