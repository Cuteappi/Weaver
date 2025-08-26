import { Paperclip, Send } from 'lucide-react'
import { ModelSelect } from '@/components/ModelSelect'

export default function PromptInput() {
	return (
		<div className="px-4 md:px-6 pb-3">
			<div
				className="rounded-3xl border p-2 md:p-3 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/5 transition-shadow"
				style={{
					borderColor: 'var(--border)',
					background: 'color-mix(in oklab, var(--surface-primary) 85%, transparent)'
				}}
			>
				<div className="flex items-end gap-2">
					<button
						type="button"
						disabled
						title="Attach file"
						aria-label="Attach file"
						className="rounded-full inline-flex h-9 w-9 items-center justify-center text-[var(--text-secondary)] disabled:opacity-60"
					>
						<Paperclip className="h-4 w-4" />
					</button>
					<textarea
						placeholder="Type your prompt..."
						rows={1}
						readOnly
						disabled
						aria-label="Prompt input"
						className="flex-1 text-sm md:text-base bg-transparent leading-6 resize-none outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] overflow-y-auto h-[2.75rem] min-h-[2.75rem] max-h-[2.75rem] md:h-12 md:min-h-[3rem] md:max-h-[3rem]"
					/>
					<button
						type="button"
						disabled
						title="Send"
						aria-label="Send prompt"
						className="rounded-full inline-flex h-9 w-9 items-center justify-center disabled:opacity-60 shadow-md hover:brightness-110"
						style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
					>
						<Send className="h-4 w-4" />
					</button>
				</div>
				<div className="mt-1 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
					<ModelSelect />
					<span>Shift + Return to add a new line</span>
				</div>
			</div>
		</div>
	)
}

