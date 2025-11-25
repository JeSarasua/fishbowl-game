import { TeamColor } from './enums/team-color';

/**
 * Various payload types for DTOs
 */
export type NewConnection = {
  player: string;
  words: string[];
};

export type WordTally = {
  name: string;
  team: string;
  correct: boolean;
};

export type GameState = {
  url: string;
  gameStarted: boolean;
  winner: string;
  turn: TeamColor | undefined;
  score: Record<TeamColor, number>;
  word: string | undefined;
  roundEndsAt: number;
  error: string;
};
