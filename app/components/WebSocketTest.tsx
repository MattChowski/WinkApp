import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function WebSocketTest() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setStatus('connecting');

    const socket = io(`http://${window.location.host}/ws`, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket.io connected');
      setStatus('connected');
    });

    socket.on('message', (data: string) => {
      console.log('Message received:', data);
      setMessages(prev => [...prev, data]);
    });

    socket.on('connect_error', error => {
      console.error('Socket.io connect error:', error.message);
      setStatus('disconnected');
    });

    socket.on('disconnect', () => {
      console.log('Socket.io disconnected');
      setStatus('disconnected');
    });

    // NestJS WsException errors come through this event
    socket.on('exception', (error: { status: string; message: string }) => {
      console.error('WsException:', error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('message', 'bruh');
      console.log('Sent: bruh');
    } else {
      console.error('Socket is not connected');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Socket.io Test</h2>
      <div>
        <strong>Status:</strong> {status}
      </div>
      <button
        onClick={sendMessage}
        // disabled={status !== 'connected'}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
        }}>
        Send "bruh"
      </button>
      <div style={{ marginTop: '20px' }}>
        <strong>Messages received:</strong>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
