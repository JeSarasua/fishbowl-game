import { createContext, useContext } from 'react';
import { GameState } from '../models/payload';

export const GameStateContext = createContext<GameState | undefined>(undefined);

export function useGameStateContext() {
  const gameState = useContext(GameStateContext);

  if (!gameState) {
    throw new Error('useGameStateContext is undefined!');
  }

  return gameState;
}
