// app/hooks/useSocketEvent.ts
import { useEffect, useRef } from 'react';
import { useSocket } from '~/context/SocketContext';
import type { ServerToClientEvents } from '~/types/types';

export const useSocketEvent = <K extends keyof ServerToClientEvents>(event: K, handler: ServerToClientEvents[K]) => {
  const { socket } = useSocket();
  const handlerRef = useRef(handler);

  // Always keep the ref up to date with the latest handler
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!socket) return;

    const eventHandler = ((...args: Parameters<ServerToClientEvents[K]>) => {
      (handlerRef.current as (...args: Parameters<ServerToClientEvents[K]>) => void)(...args);
    }) as ServerToClientEvents[K];

    // Socket.IO's generic types don't narrow properly with indexed access
    // biome-ignore lint/suspicious/noExplicitAny: Socket.IO generics limitation
    (socket as any).on(event, eventHandler);
    return () => {
      // biome-ignore lint/suspicious/noExplicitAny: Socket.IO generics limitation
      (socket as any).off(event, eventHandler);
    };
  }, [socket, event]); // handler not in deps
};
