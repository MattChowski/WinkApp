import type { JSONContent } from '@tiptap/react'
import { MessageContent } from './MessageContent'

interface ChatMessageProps {
  author: string
  json: JSONContent
  createdAt: string
  showAuthor?: boolean
}

export const ChatMessage = ({ author, json, createdAt, showAuthor = true }: ChatMessageProps) => {
  const formattedDate = new Date(createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="group flex gap-3 px-4 py-2 hover:bg-white/5">
      {showAuthor ? (
        <div className="flex aspect-square h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-sm text-white">
          {author.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className="flex w-10 min-w-10">
          <span className="mt-1 text-white/40 text-xs opacity-0 group-hover:opacity-100">{formattedDate}</span>
        </div>
      )}
      <div className="flex flex-col">
        {showAuthor ? (
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm text-white leading-5">{author}</span>
            <span className="text-white/40 text-xs">{formattedDate}</span>
          </div>
        ) : null}
        <MessageContent json={json} />
      </div>
    </div>
  )
}
