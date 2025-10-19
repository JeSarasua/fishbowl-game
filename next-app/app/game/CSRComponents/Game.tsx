'use client';
import { useGameStateContext } from '../contexts/GameStateContext';

export default function Game() {
  const gameState = useGameStateContext();

  // Restart button
  return (
    <div>
      <div>{gameState.roundEndsAt}</div>
      <div>this is the live game</div>
    </div>
  );
}
