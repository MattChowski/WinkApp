import { Button } from '@headlessui/react'
import { Hash, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { useChannelsQuery } from '~/apiHooks/useChannelsQuery'
import { SidebarAccordion, SidebarAccordionItem } from '~/components/base/SidebarAccordion'

const ChannelsActions = () => {
  return (
    <Button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-0.5 text-white/70 hover:bg-white/10 hover:text-white">
      <Plus />
    </Button>
  )
}

const ChannelsList = () => {
  const { data: channels } = useChannelsQuery()
  const navigate = useNavigate()
  const { orgid, channelid } = useParams<{ orgid: string; channelid: string }>()

  const handleChannelChange = (channelId: string) => {
    navigate(`/${orgid}/${channelId}`)
  }

  return (
    <div className="w-full px-4 py-4">
      <SidebarAccordion title="Channels" action={<ChannelsActions />}>
        {channels?.map((channel) => (
          <SidebarAccordionItem
            key={channel.id}
            value={channel.id}
            onClick={handleChannelChange}
            active={channelid === channel.id}
          >
            <Hash className="mr-1 inline-block w-4" /> {channel.name}
          </SidebarAccordionItem>
        ))}
      </SidebarAccordion>
    </div>
  )
}

export { ChannelsList, SidebarAccordion, SidebarAccordionItem }
