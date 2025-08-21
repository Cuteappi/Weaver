import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from './chat'

export const Route = createFileRoute('/')({
    component: () => <ChatPage />,
})
