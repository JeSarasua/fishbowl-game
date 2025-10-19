'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GameState } from '../models/payload';
import { ServerToClientDTO } from '../models/dto/server-to-client-dto';
import { ServerToClientMessageType } from '../models/enums/server-to-client-message-type';

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket>(undefined);
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => console.log('Websocket connected');
    socket.onmessage = (e) => {
      const dto = JSON.parse(e.data) as ServerToClientDTO;
      switch (dto.type) {
        case ServerToClientMessageType.NewConnection:
          break;

        case ServerToClientMessageType.Game:
          console.log('📩', dto.payload);
          setGameState(dto.payload);
        // TODO: figure out how to use react context with provider so I can set gameStarted across my application
        case ServerToClientMessageType.TimeExpired:
          break;

        case ServerToClientMessageType.Restart:
          setGameState(dto.payload);
          break;
      }
    };
    socket.onclose = () => console.log('Websocket disconnected');
  }, [url]);

  const sendGameState = useCallback((msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  }, []);

  return { gameState, sendGameState };
}
