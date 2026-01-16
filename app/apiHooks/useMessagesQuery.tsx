import { useQuery } from '@tanstack/react-query'
import type { components } from '~/types/api'

interface FetchMessagesOptions {
  limit?: number
  cursor?: string
}

export const groupMessages = (
  messages: components['schemas']['MessageDto'][],
  initialValue?: Record<string, components['schemas']['MessageDto'][]>,
) => {
  return messages.reduce(
    (groups, message) => {
      const dateKey = new Date(message.createdAt).toDateString()

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)

      return groups
    },
    initialValue || ({} as Record<string, components['schemas']['MessageDto'][]>),
  )
}

const fetchMessages = async (
  channelId: string,
  options: FetchMessagesOptions,
): Promise<Record<string, components['schemas']['MessageDto'][]>> => {
  const searchParams = new URLSearchParams(options as Record<string, string>)
  const response = await fetch(`/api/chat/${channelId}/messages?${searchParams.toString()}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch channels')
  }

  const messages = (await response.json()) as components['schemas']['MessageDto'][]

  const groupedMessages = groupMessages(messages)

  return groupedMessages
}

export const useMessagesQuery = (channelId: string | undefined, options: FetchMessagesOptions) => {
  return useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => fetchMessages(channelId || '', options),
    enabled: !!channelId,
    staleTime: Infinity,
    placeholderData: {},
  })
}
