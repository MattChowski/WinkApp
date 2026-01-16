import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { useMessagesQuery } from '~/apiHooks/useMessagesQuery'
import { useSocketEvent } from '~/hooks/useSocketEvent'
import type { components } from '~/types/api'
import { Loader } from '../base/Loader'
import { ChatMessage } from './ChatMessage'
import { ChatMessageDateSeparator } from './ChatMessageDateSeparator'

interface ChatMessagesProps {
  isFetchingChannelData: boolean
}

export const ChatMessages = ({ isFetchingChannelData }: ChatMessagesProps) => {
  const queryClient = useQueryClient()

  const { channelid } = useParams<{ channelid: string }>()
  const { data: groupedMessages, isFetching: isFetchingMessages } = useMessagesQuery(channelid, { limit: 50 })
  const isLoading = isFetchingChannelData || isFetchingMessages

  useSocketEvent('newMessage', (message) => {
    if (message.channelId !== channelid) {
      queryClient.invalidateQueries({ queryKey: ['messages', message.channelId] })
      return
    }

    if (message.channelId === channelid) {
      queryClient.setQueryData<Record<string, components['schemas']['MessageDto'][]>>(
        ['messages', channelid],
        (old = {}) => {
          const dateKey = new Date(message.createdAt).toDateString()
          const existingMessages = old[dateKey] ?? []

          return {
            ...old,
            [dateKey]: [...existingMessages, message],
          }
        },
      )
      return
    }
  })

  return (
    <div className="relative flex grow flex-col overflow-auto text-white">
      {isLoading || !groupedMessages ? (
        <Loader />
      ) : (
        Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            <ChatMessageDateSeparator date={date} />
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                author={msg.author.name ?? 'Unknown'}
                json={msg.json}
                createdAt={msg.createdAt}
                showAuthor={index === 0 || messages[index - 1].author.id !== msg.author.id}
              />
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export { ChatMessage }
