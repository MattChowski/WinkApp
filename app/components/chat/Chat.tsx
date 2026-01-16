import { useParams } from 'react-router'
import { useChannelQuery } from '~/apiHooks/useChannelsQuery'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'

export const Chat = () => {
  const { channelid } = useParams<{ channelid: string }>()
  const { data: channelData, isFetching: isFetchingChannelData } = useChannelQuery(channelid)

  return (
    <div className="flex h-full grow flex-col">
      {isFetchingChannelData ? null : <ChatHeader />}
      <ChatMessages isFetchingChannelData={isFetchingChannelData} />
      <ChatFooter channelName={channelData?.name || ''} channelId={channelid} />
    </div>
  )
}
