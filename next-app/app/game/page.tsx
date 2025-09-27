'use client';

import { useEffect, useState } from 'react';
import GameBoard from './CSRComponents/GameBoard';
import RestartButton from './CSRComponents/RestartButton';
import { useWebSocket } from './hooks/useWebSocket';
import ErrorMessage from './CSRComponents/ErrorMessage';
import InputWords from './CSRComponents/InputWords';
import InputName from './CSRComponents/InputPlayerName';

export default function GamePage() {
  const { gameState, sendGameState } = useWebSocket('ws://localhost:8800');

  const [board, setBoard] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [words, setWords] = useState<string[] | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (gameState) {
      setBoard(gameState.board);
      setError(gameState.error);
      setWinner(gameState.winner);
    }
  }, [gameState]);

  useEffect(() => {
    console.log('HI!');
    if (words && name) {
      setGameStarted(true);
      sendGameState(JSON.stringify({ type: 'New Connection', payload: { player: name, words } }));
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
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Tic Tac Toe</h1>
      {!gameStarted && !words && <InputWords submitWords={submitWords} />}
      {!gameStarted && words && <InputName submitName={submitName} />}

      {gameStarted && (
        <GameBoard
          board={board}
          handleClickCB={(index: number) => {
            if (!winner) sendGameState(`${index}`);
          }}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {winner && `Players: '${winner}' wins! Press 'restart' to play again.`}
      {
        <RestartButton
          restartClickCB={() => {
            sendGameState(`restart`);
          }}
        />
      }
    </div>
  );
}
