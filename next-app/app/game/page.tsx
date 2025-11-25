'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import ErrorMessage from './CSRComponents/ErrorMessage';
import { ClientToServerDTO } from './models/dto/client-to-server-dto';
import GameLobby from './CSRComponents/GameLobby';
import Game from './CSRComponents/Game/Game';
import RestartButton from './CSRComponents/RestartButton';
import { ClientToServerMessageType } from './models/enums/client-to-server-message-type';
import { GameStateContext } from './contexts/GameStateContext';
import { WordTally } from './models/payload';

export default function GamePage() {
  const { gameState, sendGameState } = useWebSocket('ws://localhost:8800');

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [board, setBoard] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  const handleRestart = () => {
    sendGameState(
      JSON.stringify({
        type: ClientToServerMessageType.Restart,
        payload: {},
      } as ClientToServerDTO),
    );
  };

  const handleWordTally = (tally: WordTally) => {
    sendGameState(
      JSON.stringify({
        type: ClientToServerMessageType.Tally,
        payload: tally,
      } as ClientToServerDTO),
    );
  };

  useEffect(() => {
    console.log('we got new state!');
    if (gameState && Object.keys(gameState).length > 0) {
      setGameStarted(gameState.gameStarted);
    }
  }, [gameState]);

  return (
    <GameStateContext.Provider value={gameState}>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Tic Tac Toe</h1>
        {gameStarted ? (
          <>
            <Game tallyWordCB={handleWordTally} />
            <RestartButton restartClickCB={handleRestart} />
          </>
        ) : (
          <GameLobby />
        )}

        {error && <ErrorMessage message={error} />}
        {winner && `Players: '${winner}' wins! Press 'restart' to play again.`}
      </div>
    </GameStateContext.Provider>
  );
}
