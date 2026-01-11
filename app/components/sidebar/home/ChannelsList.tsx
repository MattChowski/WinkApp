import { Button } from "@headlessui/react";
import { Hash, Plus } from "lucide-react";
import { useChannelsQuery } from "~/apiHooks/useChannelsQuery";
import { SidebarAccordion, SidebarAccordionItem } from "~/components/base/SidebarAccordion";

const channels = [
  { id: 1, name: "general" },
  { id: 2, name: "random" },
  { id: 3, name: "announcements" },
];

const ChannelsActions = () => {
  return (
    <Button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-0.5 text-white/70 hover:bg-white/10 hover:text-white">
      <Plus />
    </Button>
  );
};

const ChannelsList = () => {
  const { data: channels } = useChannelsQuery();
  console.log({ channels });

  return (
    <div className="w-full px-4 py-4">
      <SidebarAccordion title="Channels" action={<ChannelsActions />}>
        {channels?.map((channel) => (
          <SidebarAccordionItem key={channel.id}>
            <Hash className="mr-1 inline-block w-4" /> {channel.name}
          </SidebarAccordionItem>
        ))}
      </SidebarAccordion>
    </div>
  );
};

export { ChannelsList, SidebarAccordion, SidebarAccordionItem };
