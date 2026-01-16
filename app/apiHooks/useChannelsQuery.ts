import { useQuery } from '@tanstack/react-query';
import type { components } from '../types/api';

const fetchChannels = async (): Promise<components['schemas']['ChannelDto'][]> => {
  const response = await fetch('/api/channels/joined', {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch channels');
  }

  return response.json();
};

const fetchChannel = async (id: string): Promise<components['schemas']['ChannelDto']> => {
  const response = await fetch(`/api/channels/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch channel');
  }

  return response.json();
};

export const useChannelsQuery = () => {
  return useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
  });
};

export const useChannelQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['channel', id],
    // biome-ignore lint/style/noNonNullAssertion: ID will be always defined when this query is enabled
    queryFn: () => fetchChannel(id!),
    enabled: !!id,
    staleTime: Infinity,
  });
};
