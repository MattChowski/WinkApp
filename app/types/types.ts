import type { JSONContent } from '@tiptap/react';
import type { components } from './api';

export type UrlParams = {
  orgid: string;
  channel?: string;
};

export interface ClientToServerEvents {
  // Events the client sends to server
  sendMessage: (data: { channelId: string; content: string; json: JSONContent }) => void;
  joinChannel: (channelId: string) => void;
  typing: (channelId: string) => void;
}

export interface ServerToClientEvents {
  // Events the server sends to client
  newMessage: (message: components['schemas']['MessageDto']) => void;
  userJoined: (userId: string) => void;
}
