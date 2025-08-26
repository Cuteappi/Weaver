import * as React from 'react'
import { ScrollArea } from '@/components/primitives/ScrollArea'
import { Hero } from '@/components/Hero'
import { MessageBubble } from './MessageBubble'
import { ChatMessage } from './types'

export interface MessageListProps {
  messages: ChatMessage[]
  listRef: React.RefObject<HTMLDivElement | null>
}

export function MessageList({ messages, listRef }: MessageListProps) {
  return (
    <ScrollArea ref={listRef as any} className="min-h-[60vh] pb-40">
      <div className="flex flex-col gap-4 pr-2">
        {messages.length === 0 ? <Hero /> : null}
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}
      </div>
    </ScrollArea>
  )
}
