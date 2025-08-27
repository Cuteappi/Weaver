import { useState, useCallback, useMemo } from 'react'
import { useAuth } from '@workos-inc/authkit-react'
import { useConvexAuth } from 'convex/react'
import { Button } from '@/components/ui/button'
import { Settings, ChevronDown, LogIn, LogOut, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LoginModal } from '@/components/auth/LoginModal'
import { AccountModal } from '@/components/auth/AccountModal'

export interface ChatBadgeProps {
	className?: string
}

export function ChatBadge({ className }: ChatBadgeProps) {
	const { user, signIn, signOut } = useAuth()
	const { isAuthenticated } = useConvexAuth()

	const [menuOpen, setMenuOpen] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'login' | 'account'>('login')

	const displayName = useMemo(() => {
		return isAuthenticated ? (user?.firstName || user?.email || 'User') : 'Guest'
	}, [isAuthenticated, user?.firstName, user?.email])

	const tier = useMemo(() => {
		// Placeholder: wire to actual subscription tier when available
		return isAuthenticated ? 'Free' : 'Visitor'
	}, [isAuthenticated])

	const openLogin = useCallback(() => {
		setModalType('login')
		setModalOpen(true)
	}, [])

	const openAccount = useCallback(() => {
		setModalType('account')
		setModalOpen(true)
	}, [])

	const handleLogin = useCallback(() => {
		try { void signIn?.() } finally { setModalOpen(false) }
	}, [signIn])

	const handleSignOut = useCallback(() => {
		try { signOut?.() } finally { setModalOpen(false) }
	}, [signOut])

	return (
		<div className={cn('relative px-1 text-sm text-[var(--text-muted)]', className)}>
			<div className="flex items-center justify-between">
				<button
					type="button"
					onClick={() => setMenuOpen((v) => !v)}
					className="flex items-center gap-2 px-2 py-1 rounded-md focus:outline-none hover:bg-white/5 transition-colors"
					aria-label={isAuthenticated ? 'Account' : 'Login'}
					title={isAuthenticated ? 'Account' : 'Login'}
				>
					<div
						className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-[10px] font-medium"
						aria-hidden
					>
						{(displayName || 'U').slice(0, 1).toUpperCase()}
					</div>
					<div className="flex flex-col items-start">
						<div className="truncate max-w-[160px] text-[var(--text-primary)]/90 leading-5">{displayName}</div>
						<div className="text-[11px] uppercase tracking-wide opacity-70">{tier}</div>
					</div>
					<ChevronDown className="h-4 w-4 opacity-70" />
				</button>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Settings"
					title="Settings"
					onClick={() => setMenuOpen(false)}
				>
					<Settings className="h-5 w-5" />
				</Button>
			</div>

			{menuOpen && (
				<div
					role="menu"
					className="absolute left-1 right-1 bottom-10 z-50 rounded-lg border shadow-lg overflow-hidden"
					style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}
				>
					<div className="p-1">
						{isAuthenticated ? (
							<>
								<Button
									variant="ghost"
									size="default"
									className="w-full justify-start gap-2 hover:bg-white/5"
									onClick={() => { setMenuOpen(false); openAccount() }}
								>
									<User2 className="h-4 w-4" /> Account
								</Button>
								<Button
									variant="ghost"
									size="default"
									className="w-full justify-start gap-2 hover:bg-white/5"
									onClick={() => { setMenuOpen(false); setModalType('account'); setModalOpen(true) }}
								>
									<Settings className="h-4 w-4" /> Manage
								</Button>
								<Button
									variant="outline"
									size="default"
									className="w-full justify-start gap-2 mt-1"
									onClick={() => { setMenuOpen(false); setModalType('account'); setModalOpen(true) }}
								>
									<LogOut className="h-4 w-4" /> Sign out
								</Button>
							</>
						) : (
							<Button
								variant="default"
								size="default"
								className="w-full justify-center gap-2"
								onClick={() => { setMenuOpen(false); openLogin() }}
							>
								<LogIn className="h-4 w-4" /> Sign in
							</Button>
						)}
					</div>
				</div>
			)}

			{/* Modals */}
			{modalType === 'login' ? (
				<LoginModal open={modalOpen} onClose={() => setModalOpen(false)} onLogin={handleLogin} />
			) : (
				<AccountModal open={modalOpen} onClose={() => setModalOpen(false)} onSignOut={handleSignOut} />
			)}
		</div>
	)
}

export default ChatBadge
