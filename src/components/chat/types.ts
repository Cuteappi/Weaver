export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  ts: number
}
