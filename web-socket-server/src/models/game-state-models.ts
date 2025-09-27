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

export type GameState = {
  url: string;
  winner: string;
  turn: TeamColor | undefined;
  score: Record<TeamColor, number>;
  word: string;
  roundEndsAt: number;
  error: string;
};
