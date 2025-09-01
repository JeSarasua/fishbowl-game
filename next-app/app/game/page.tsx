'use client';

import { useEffect, useState } from 'react';
import GameBoard from './CSRComponents/GameBoard';
import RestartButton from './CSRComponents/RestartButton';
import { useWebSocket } from './hooks/useWebSocket';
import ErrorMessage from './CSRComponents/ErrorMessage';

export default function GamePage() {
  const { gameState, sendGameState } = useWebSocket('ws://localhost:8800');

  const [board, setBoard] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (gameState) {
      setBoard(gameState.board);
      setError(gameState.error);
      setWinner(gameState.winner);
    }
  }, [gameState]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Tic Tac Toe</h1>
      <GameBoard
        board={board}
        handleClickCB={(index: number) => {
          if (!winner) sendGameState(`${index}`);
        }}
      />
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
