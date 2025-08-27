import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Sparkles, MessageSquare, Bot } from 'lucide-react'
import { ChatBadge } from '@/components/chat/ChatBadge'

// Minimal shadcn/ui Sidebar primitives implemented inline to avoid adding files under src/components/ui/
function Sidebar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			data-sidebar
			className={`group/sidebar flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground ${className}`}
		>
			{children}
		</div>
	)
}

function SidebarHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`px-5 pt-5 pb-2 ${className}`}>{children}</div>
}

function SidebarContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`flex-1 min-h-0 overflow-hidden px-5 ${className}`}>{children}</div>
}

function SidebarFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`px-5 pt-3 pb-5 border-t border-sidebar-border ${className}`}>{children}</div>
}

function SidebarGroup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`space-y-2 ${className}`}>{children}</div>
}

function SidebarGroupLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`text-[11px] uppercase tracking-widest font-medium text-muted-foreground px-1 ${className}`}>
			{children}
		</div>
	)
}

function SidebarGroupContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`relative min-h-0 ${className}`}>{children}</div>
}

function SidebarMenu({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`space-y-1.5 pr-1 ${className}`}>{children}</div>
}

function SidebarMenuItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={className}>{children}</div>
}

export function ChatSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-1 mb-4">
					<div className="h-6 w-6 rounded-xl shadow ring-1 ring-sidebar-ring/20 bg-primary/20" aria-hidden />
					<div className="text-lg font-semibold text-muted-foreground">Weaver Studio</div>
					<span className="ml-auto inline-flex items-center rounded-md border border-sidebar-border px-2 py-0.5 text-xs">Chat</span>
				</div>
				<Button variant="default" size="lg" className="w-full rounded-2xl shadow-lg">
					<Plus className="h-4 w-4 mr-2" /> New Chat
				</Button>
				<div className="my-6 mx-auto flex w-full items-center justify-between gap-4">
					<Button variant="outline" size="icon" className="h-10 flex flex-1 rounded-lg justify-center transition-colors hover:bg-sidebar-accent/50 active:bg-sidebar-accent" title="Prompt Ideas" aria-label="Prompt Ideas">
						<Sparkles className="h-6 w-6" />
					</Button>
					<Button variant="outline" size="icon" className="h-10 flex flex-1 rounded-lg justify-center transition-colors hover:bg-sidebar-accent/50 active:bg-sidebar-accent" title="Blank Chat" aria-label="Blank Chat">
						<MessageSquare className="h-6 w-6" />
					</Button>
					<Button variant="outline" size="icon" className="h-10 flex flex-1 rounded-lg justify-center transition-colors hover:bg-sidebar-accent/50 active:bg-sidebar-accent" title="Assistants" aria-label="Assistants">
						<Bot className="h-6 w-6" />
					</Button>
				</div>
				<div className="relative my-3">
					<Input
						placeholder="Search your threads..."
						className='pl-10 text-base rounded-xl shadow-inner bg-muted placeholder:text-muted-foreground'
						aria-label="Search threads"
					/>
					<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden />
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Recent</SidebarGroupLabel>
					<SidebarGroupContent>
						<div className="overflow-auto custom-scrollbar" style={{ minHeight: 0 }}>
							<SidebarMenu>
								{["Design doc: RAG pipeline", "Meeting notes - 08/20", "Quick draft: marketing", "Bug triage follow-up", "Ideas for v2"].map((title, idx) => (
									<SidebarMenuItem key={idx}>
										<Button
											variant='ghost'
											size='default'
											className="justify-start w-full text-left hover:bg-sidebar-accent/50 active:bg-sidebar-accent transition-colors rounded-lg px-3 py-2.5 gap-3"
											title={title}
											aria-label={`Open thread ${title}`}
										>
											<MessageSquare className="h-5 w-5 text-muted-foreground" />
											<span className="truncate text-base leading-6">{title}</span>
										</Button>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<ChatBadge />
			</SidebarFooter>
		</Sidebar>
	)
}
export default ChatSidebar
