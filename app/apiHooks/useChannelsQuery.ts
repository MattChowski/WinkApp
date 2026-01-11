import { useQuery } from "@tanstack/react-query";
import type { components } from "../types/api";

const fetchChannels = async (): Promise<components["schemas"]["ChannelDto"][]> => {
  const response = await fetch("/api/channels", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch channels");
  }

  return response.json();
};

export const useChannelsQuery = () => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });
};
