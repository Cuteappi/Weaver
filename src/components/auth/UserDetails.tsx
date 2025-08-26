import { useState } from 'react'
import { useAuth } from '@workos-inc/authkit-react'
import { IconButton } from '@/components/primitives/IconButton'
import { Activity, Settings } from 'lucide-react'
import { useConvexAuth } from 'convex/react'
import { Avatar } from '@/components/primitives/Avatar'
import ReactDOM from 'react-dom'
import { Button } from '../primitives/Button'

interface LoginModalProps {
	isOpen: boolean,
	authStatus: boolean,
	close: () => void,
	signIn: () => void,
	signOut: () => void
}

const modalStyle = "fixed top-50% left-50% z-5000 flex items-center justify-center"

function LoginModal({ isOpen, authStatus, close, signIn, signOut }: LoginModalProps) {
	const title = authStatus ? 'Sign out of Weaver' : 'Sign in to Weaver'
	const message = authStatus ? 'Sign out to end your session.' : 'Sign in to save your chats across devices.'
	console.log(isOpen)

	const handleAuthButtonClick = () => {
		try {
			if (authStatus)
				void signIn?.()
			else
				signOut()
		} finally {
			close()
		}
	}

	return ReactDOM.createPortal(
		<Activity mode={isOpen ? 'visible' : 'hidden'}>
			<div className='fixed top-0 left-0 right-0 bottom-0 fixed z-40 bg-black/50' />
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="login-modal-title"
				className="fixed top-50% left-50% z-5000 flex items-center justify-center"
			>
				<div className="absolute inset-0 bg-black/60" onClick={close} />
				<div
					className="relative z-10 w-full max-w-sm rounded-2xl border shadow-xl p-4 md:p-5"
					style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}
				>
					<div id="login-modal-title" className="text-base md:text-lg font-semibold mb-2">{title}</div>
					<p className="text-sm text-[var(--text-muted)] mb-4">{message}</p>

					<div className="flex items-center justify-end gap-2">
						{authStatus ? <>
							<Button variant="ghost" onClick={close}>Close</Button>
							<Button variant="outline" onClick={handleAuthButtonClick}>Sign out</Button>
						</> : <>
							<Button variant="ghost" onClick={close}>Cancel</Button>
							<Button variant="primary" onClick={handleAuthButtonClick}>Login</Button>
						</>
						}
					</div>
				</div>
			</div >
		</Activity >,
		document.getElementById("portal")!
	)
}

export default function UserDetails() {
	const { user, signIn, signOut } = useAuth()
	const [isopen, setIsOpen] = useState(false)
	const { isAuthenticated } = useConvexAuth()
	const displayName: string = isAuthenticated ? (user?.firstName || user?.email || 'User') : 'Guest'


	return (
		<>
			<div className="relative px-1 text-sm text-[var(--text-muted)]">
				<div className="flex items-center justify-between">
					<button
						type="button"
						onClick={() => setIsOpen(true)}
						className="flex items-center gap-2 px-2 py-1 rounded-md focus:outline-none hover:bg-white/5 transition-colors"
						aria-label={isAuthenticated ? 'Account' : 'Login'}
						title={isAuthenticated ? 'Account' : 'Login'}
					>
						<Avatar label={displayName} />
						<div className="truncate max-w-[160px] text-[var(--text-primary)]/90">{displayName}</div>
					</button>
					<SettingsButton />
				</div>
			</div>
			<LoginModal
				isOpen={isopen}
				close={() => setIsOpen(false)}
				authStatus={isAuthenticated}
				signIn={signIn}
				signOut={signOut}
			/>

		</>
	)
}

function SettingsButton() {
	return <IconButton variant="ghost" size="md" aria-label="Settings" title="Settings">
		<Settings className="h-5 w-5" />
	</IconButton>
}

// function UserStatusInner() {
// 	const { user, signIn, signOut } = useAuth()
// 	const [open, setOpen] = useState(false)
// 	const { isAuthenticated } = useConvexAuth()

// 	const displayName: string = isAuthenticated ? (user?.firstName || user?.email || 'User') : 'Guest'

// 	const handleRowClick = useCallback(() => {
// 		setOpen(true)
// 	}, [])

// 	const onLogin = useCallback(() => {
// 		try {
// 			void signIn?.()
// 		} finally {
// 			setOpen(false)
// 		}
// 	}, [signIn])

// 	const onSignOut = useCallback(() => {
// 		try {
// 			signOut?.()
// 		} finally {
// 			setOpen(false)
// 		}
// 	}, [signOut])

// 	return (
// 		<>
// 			<div className="relative px-1 text-sm text-[var(--text-muted)]">
// 				<div className="flex items-center justify-between">
// 					<button
// 						type="button"
// 						onClick={handleRowClick}
// 						className="flex items-center gap-2 focus:outline-none"
// 						aria-label={isAuthenticated ? 'Account' : 'Login'}
// 						title={isAuthenticated ? 'Account' : 'Login'}
// 					>
// 						<Avatar label={displayName} />
// 						<div className="truncate max-w-[160px] text-[var(--text-primary)]/90">{displayName}</div>
// 					</button>
// 					<IconButton variant="ghost" size="md" aria-label="Settings" title="Settings">
// 						<Settings className="h-5 w-5" />
// 					</IconButton>
// 				</div>
// 			</div>
// 			{isAuthenticated ? (
// 				<AccountModal open={open} onClose={() => setOpen(false)} onSignOut={onSignOut} />
// 			) : (
// 				<LoginModal open={open} onClose={() => setOpen(false)} onLogin={onLogin} />
// 			)}
// 		</>
// 	)
// }

// function GuestUserStatus() {
// 	const [open, setOpen] = useState(false)
// 	const onLogin = useCallback(() => setOpen(false), [])
// 	return (
// 		<>
// 			<div className="relative px-1 text-sm text-[var(--text-muted)]">
// 				<div className="flex items-center justify-between">
// 					<button
// 						type="button"
// 						onClick={() => setOpen(true)}
// 						className="flex items-center gap-2 px-2 py-1 rounded-md focus:outline-none hover:bg-white/5 transition-colors"
// 						aria-label="Login"
// 						title="Login"
// 					>
// 						<Avatar label={'G'} />
// 						<div className="truncate max-w-[160px] text-[var(--text-primary)]/90">Guest</div>
// 					</button>
// 					<IconButton variant="ghost" size="md" aria-label="Settings" title="Settings">
// 						<Settings className="h-5 w-5" />
// 					</IconButton>
// 				</div>
// 			</div>
// 			<LoginModal open={open} onClose={() => setOpen(false)} onLogin={onLogin} />
// 		</>
// 	)
// }

// export default function UserStatus() {
// 	const hasAuth = Boolean(import.meta.env.VITE_WORKOS_CLIENT_ID && import.meta.env.VITE_WORKOS_REDIRECT_URI)
// 	return hasAuth ? <UserStatusInner /> : <GuestUserStatus />
// }
