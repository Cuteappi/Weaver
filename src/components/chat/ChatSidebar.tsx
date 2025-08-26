import { Button } from '@/components/primitives/Button'
import { Input } from '@/components/primitives/Input'
import { Badge } from '@/components/primitives/Badge'
import { Separator } from '@/components/primitives/Separator'
import { Plus, Search, Sparkles, MessageSquare, Bot } from 'lucide-react'
import UserDetails from '@/components/auth/UserDetails'

export function ChatSidebar() {
	return (
		<div className="h-full w-full border-r border-app-primary bg-app-primary flex flex-col p-5">
			{/* Brand / Actions */}
			<div className="relative flex flex-col gap-4 flex-1 min-h-0">
				<div className="flex items-center gap-2 px-1 mb-8">
					<div className="h-6 w-6 rounded-xl shadow ring-1 ring-white/20" aria-hidden style={{ background: 'var(--gradient-primary)' }} />
					<div className="text-lg font-semibold text-[var(--text-secondary)]">Weaver Studio</div>
					<Badge className="ml-auto">Chat</Badge>
				</div>

				{/* Primary action */}
				<Button variant="primary" size="lg" className="w-full rounded-2xl shadow-lg">
					<Plus className="h-4 w-4 mr-2" /> New Chat
				</Button>

				{/* Quick actions */}
				<div className="grid grid-cols-3 gap-2 mt-2">
					<Button variant="subtle" size="md" className="justify-center transition-colors hover:bg-white/5 active:bg-white/10" title="Prompt Ideas" aria-label="Prompt Ideas">
						<Sparkles className="h-5 w-5" />
					</Button>
					<Button variant="subtle" size="md" className="justify-center transition-colors hover:bg-white/5 active:bg-white/10" title="Blank Chat" aria-label="Blank Chat">
						<MessageSquare className="h-5 w-5" />
					</Button>
					<Button variant="subtle" size="md" className="justify-center transition-colors hover:bg-white/5 active:bg-white/10" title="Assistants" aria-label="Assistants">
						<Bot className="h-5 w-5" />
					</Button>
				</div>

				{/* Search */}
				<div className="relative my-3">
					<Input
						placeholder="Search your threads..."
						className='pl-10 text-base rounded-xl shadow-inner'
						style={{ background: 'color-mix(in oklab, var(--surface-secondary) 70%, transparent)' }}
						aria-label="Search threads"
					/>
					<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" aria-hidden />
				</div>

				{/* Recent */}
				<div className="text-[11px] uppercase tracking-widest font-medium text-[var(--text-muted)] px-1 mt-4 mb-1">Recent</div>
				<div className="relative flex-1 min-h-0">
					<div className="overflow-auto custom-scrollbar" style={{ minHeight: 0 }}>
						<div className="space-y-1.5 pr-1">
							{["Design doc: RAG pipeline", "Meeting notes - 08/20", "Quick draft: marketing", "Bug triage follow-up", "Ideas for v2"].map((title, idx) => (
								<Button
									key={idx}
									variant='ghost'
									size='md'
									className="justify-start w-full text-left hover:bg-white/5 active:bg-white/10 transition-colors rounded-lg px-3 py-2.5 gap-3"
									title={title}
									aria-label={`Open thread ${title}`}
								>
									<MessageSquare className="h-5 w-5 text-[var(--text-muted)]" />
									<span className="truncate text-base leading-6">{title}</span>
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Separator className="my-3 opacity-50" />
			<UserDetails />
		</div>
	)
}
export default ChatSidebar
