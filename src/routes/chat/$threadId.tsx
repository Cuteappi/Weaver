import ChatPage from '@/pages/ChatPage'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/chat/$threadId')({
	validateSearch: (search: Record<string, unknown>) => {
		return {
			compose: typeof search.compose === 'string' ? search.compose : undefined,
		} as { compose?: string }
	},
	component: ChatPage,
})


