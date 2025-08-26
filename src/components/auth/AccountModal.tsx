import { Button } from '@/components/primitives/Button'

export interface AccountModalProps {
  open: boolean
  onClose: () => void
  onSignOut: () => void
  title?: string
  message?: string
}

export function AccountModal({ open, onClose, onSignOut, title = 'Account', message = 'You are signed in. You can sign out below.' }: AccountModalProps) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border shadow-xl p-4 md:p-5"
        style={{ background: 'var(--card)', color: 'var(--card-foreground)', borderColor: 'var(--border)' }}
      >
        <div id="account-modal-title" className="text-base md:text-lg font-semibold mb-2">{title}</div>
        {message ? (
          <p className="text-sm text-[var(--text-muted)] mb-4">{message}</p>
        ) : null}
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="outline" onClick={onSignOut}>Sign out</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountModal
