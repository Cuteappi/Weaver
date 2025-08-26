import { ChatMessage } from './types'

export function MessageBubble({ msg }: { msg: ChatMessage }) {
	const isUser = msg.role === 'user'
	const time = new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	return (
		<div className={'flex w-full ' + (isUser ? 'justify-end' : 'justify-start')}>
			<div className={(isUser ? 'ml-8' : 'mr-8') + ' group relative max-w-[85%]'}>
				<div
					className={'rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap break-words border shadow-sm'}
					style={{
						background: isUser ? 'var(--primary)' : 'var(--card)',
						color: isUser ? 'var(--primary-foreground)' : 'var(--card-foreground)',
						borderColor: 'var(--border)'
					}}
				>
					{msg.content}
				</div>
				<div className={'mt-1 text-[10px] ' + (isUser ? 'text-right' : 'text-left')} style={{ color: 'var(--text-muted)' }}>
					{time}
				</div>
				{!isUser && (
					<button
						onClick={() => { void navigator.clipboard.writeText(msg.content).catch(() => { }) }}
						className="opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 rounded-full text-[10px] px-2 py-1 border shadow"
						style={{
							borderColor: 'var(--border)',
							background: 'var(--surface-tertiary)',
							color: 'var(--text-primary)'
						}}
						title="Copy"
						aria-label="Copy assistant message"
					>
						Copy
					</button>
				)}
			</div>
		</div>
	)
}
