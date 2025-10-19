'use client';
import React, { useEffect, useState } from 'react';
import InputWords from './InputWords';
import InputName from './InputPlayerName';
import { ClientToServerDTO } from '../models/dto/client-to-server-dto';
import StartButton from './StartButton';
import { useWebSocket } from '../hooks/useWebSocket';
import { ClientToServerMessageType } from '../models/enums/client-to-server-message-type';

// show current players in the game facilitate players picking/switching
// teams. UI should prevent players from switching teams if team count would
// be reduced to 0 show words added count
// Start button
export default function GameLobby() {
  const { gameState, sendGameState } = useWebSocket('ws://localhost:8800');

  const [words, setWords] = useState<string[] | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('HI!');
    if (words && name) {
      // setGameStarted(true);
      sendGameState(
        JSON.stringify({
          type: 'New Connection',
          payload: { player: name, words },
        } as ClientToServerDTO),
      );
    }
  }, [words, name, sendGameState]);

  const submitWords = (playerWords: string[]) => {
    setWords(playerWords);
  };

  const submitName = (playerName: string) => {
    setName(playerName);
    console.log(name);
  };

  return (
    <div>
      this is the lobby
      {!words && <InputWords submitWords={submitWords} />}
      {!name && <InputName submitName={submitName} />}
      {
        <StartButton
          startClickCB={() => {
            sendGameState(
              JSON.stringify({
                type: ClientToServerMessageType.StartGame,
                payload: {},
              } as ClientToServerDTO),
            );
          }}
        />
      }
    </div>
  );
}
