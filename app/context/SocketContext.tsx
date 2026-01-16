import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/types'

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>
interface SocketContextValue {
  socket: TypedSocket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextValue | null>(null)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket: TypedSocket = io(`http://${window.location.host}/ws`, {
      withCredentials: true,
    })
    socketRef.current = socket

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}
