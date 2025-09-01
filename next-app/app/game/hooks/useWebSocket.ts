'use client';

import { useEffect, useRef, useState } from 'react';

type GameState = {
  url: string;
  winner: string;
  turn: string;
  board: string[];
  error: string;
};

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => console.log('Websocket connected');
    socket.onmessage = (e) => {
      const data: GameState = JSON.parse(e.data);
      console.log('📩', e.data);
      setGameState(data);
    };
    socket.onclose = () => console.log('Websocket disconnected');

    return () => socket.close();
  }, [url]);

  const sendGameState = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return { gameState, sendGameState };
}
