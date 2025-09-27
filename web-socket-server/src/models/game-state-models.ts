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
  turn: string;
  error: string;
};
