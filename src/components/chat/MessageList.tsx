import * as React from 'react'
import { MessageBubble } from './MessageBubble'
import { ChatMessage } from './types'

export interface MessageListProps {
  messages: ChatMessage[]
  listRef: React.RefObject<HTMLDivElement | null>
}

export function MessageList({ messages, listRef }: MessageListProps) {
  return (
    <div ref={listRef as any} className="min-h-[60vh] pb-40 overflow-auto">
      <div className="flex flex-col gap-4 pr-2">
        {messages.length === 0 ? null : messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}
      </div>
    </div>
  )
}
