import type { TeamColor } from "./enums/team-color";

/**
 * Various payload types for DTOs, services, and repositories to use
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
