import { Button } from '@/components/primitives/Button'

export interface LoginModalProps {
	open: boolean
	onClose: () => void
	onLogin: () => void
	title?: string
	message?: string
}

export function LoginModal({ open, onClose, onLogin, title = 'Sign in to Weaver', message = 'Sign in to save your chats across devices.' }: LoginModalProps) {
	if (!open) return null
	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="login-modal-title"
			className="fixed inset-0 z-50 flex items-center justify-center"
		>
			<div className="absolute inset-0 bg-black/60" onClick={onClose} />
			<div
				className="relative z-10 w-full max-w-sm rounded-2xl border shadow-xl p-4 md:p-5"
				style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}
			>
				<div id="login-modal-title" className="text-base md:text-lg font-semibold mb-2">{title}</div>
				{message ? (
					<p className="text-sm text-[var(--text-muted)] mb-4">{message}</p>
				) : null}
				<div className="flex items-center justify-end gap-2">
					<Button variant="ghost" onClick={onClose}>Cancel</Button>
					<Button variant="primary" onClick={onLogin}>Login</Button>
				</div>
			</div>
		</div>
	)
}

export default LoginModal
