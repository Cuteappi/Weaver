import ChatWindow from '@/components/chat/ChatWindow'
import ChatSidebar from '@/components/chat/ChatSidebar'

export default function ChatPage() {

    return (
        <div className="h-screen w-full flex overflow-hidden bg-app-primary">
            <aside className="hidden md:flex w-[380px] shrink-0">
                <ChatSidebar />
            </aside>
            <section className="flex-1">
                <ChatWindow />
            </section>

        </div>

    )
}
