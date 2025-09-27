const EMPTY_GAME_STATE = {
  url: "",
  winner: "",
  turn: "X",
  board: [null, null, null, null, null, null, null, null, null],
  error: "",
};

import { GameRepository } from "../repositories/GameRepository";
import { type GameState } from "../models/game-state-models";

const filePath = "./web-socket-server/src/repositories/gameState.json";

export class GameService {
  constructor(private gameRepository: GameRepository) {}

  // FIXME: Switch turn after 60 seconds
  // updateTurn() {
  //   const newState = {
  //     ...currentState,
  //     winner: this.haveWinner(currentState.board) ? currentState.turn : "",
  //     turn: currentState.turn === "X" ? "O" : "X",
  //   };

  //   this.gameRepository.updateState(newState);
  //   return newState;
  // }

  newState() {
    this.gameRepository.updateState(EMPTY_GAME_STATE);
  }

  gameState(): GameState {
    return this.gameRepository.getState();
  }

  // validMove(selectedSquare) {
  //   return this.gameRepository.getState().board[selectedSquare] === null ? true : false;
  // }

  // error(message) {
  //   return {
  //     ...this.gameRepository.getState(),
  //     error: message,
  //   };
  // }

  /**
   * Using current board state, check all win conditions.
   */
  // haveWinner(board) {
  //   for (const line of LINES) {
  //     const [first, second, third] = line;
  //     if (
  //       board[first] != null &&
  //       board[first] === board[second] &&
  //       board[second] === board[third]
  //     ) {
  //       return board[first] === board[second];
  //     }
  //   }
  //   return null;
  // }
}
