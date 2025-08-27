import { redirect, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/callback')({
	beforeLoad: () => {
		return redirect({ to: '/' })
	},
	component: () => <div style={{ minHeight: '100vh' }}>Callback</div>,
})
