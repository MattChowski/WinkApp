import type { JSONContent } from '@tiptap/react';
import { useCallback } from 'react';
import { useSocket } from '~/context/SocketContext';

interface SendMessageParams {
  channelId?: string;
  json: JSONContent;
  text: string;
}

export const useEditorHandler = () => {
  const { socket, isConnected } = useSocket();

  const sendMessage = useCallback(
    ({ channelId, json, text }: SendMessageParams) => {
      if (!isConnected || !socket) return;

      if (text && json && channelId) {
        socket.emit('sendMessage', { channelId, content: text, json });
      }
    },
    [isConnected, socket],
  );

  return {
    sendMessage,
  };
};
