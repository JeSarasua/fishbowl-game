import type { TeamColor } from "../enums/TeamColor";

export type Message = {
  type: string;
  payload: any;
};

export type NewConnection = {
  player: string;
  words: string[];
};

export type WordTally = {
  name: string;
  player: string;
  team: string;
};

export type ServerToClientMessage = {
  type: string;
  payload: GameState;
};

export type GameState = {
  url: string;
  isGameLive: boolean;
  winner: string;
  turn: TeamColor | undefined;
  score: Record<TeamColor, number>;
  word: string | undefined;
  roundEndsAt: number;
  error: string;
};
