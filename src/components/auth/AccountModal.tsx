import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export interface AccountModalProps {
	open: boolean
	onClose: () => void
	onSignOut: () => void
}

export function AccountModal({ open, onClose, onSignOut }: AccountModalProps) {
	return (
		<Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Account</DialogTitle>
					<DialogDescription>Manage your account</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>Close</Button>
					<Button variant="outline" onClick={onSignOut}>Sign out</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AccountModal
