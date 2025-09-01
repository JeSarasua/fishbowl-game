const EMPTY_GAME_STATE = {
  url: "",
  winner: "",
  turn: "X",
  board: [null, null, null, null, null, null, null, null, null],
  error: "",
};

const GAMESTATE = "gameState.json";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LINES } from "./winConditions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, GAMESTATE);

export class GameState {
  constructor() {
    this.newState();
  }

  move(selectedSquare) {
    const currentState = this.getState();
    currentState.board[selectedSquare] = currentState.turn;

    const newState = {
      ...currentState,
      winner: this.haveWinner(currentState.board) ? currentState.turn : "",
      turn: currentState.turn === "X" ? "O" : "X",
    };

    this.updateState(newState);
    return newState;
  }

  // FIXME: Decide if I want to make this async or not
  getState() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  // FIXME: Decide if I want to make this async or not
  updateState(state) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(state, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error writing:", err);
        } else {
          console.log("Updated JSON written to", filePath);
        }
      }
    );
  }

  newState() {
    this.updateState(EMPTY_GAME_STATE);
  }

  validMove(selectedSquare) {
    return this.getState().board[selectedSquare] === null ? true : false;
  }

  error(message) {
    return {
      ...this.getState(),
      error: message,
    };
  }

  /**
   * Using current board state, check all win conditions.
   */
  haveWinner(board) {
    for (const line of LINES) {
      const [first, second, third] = line;
      if (
        board[first] != null &&
        board[first] === board[second] &&
        board[second] === board[third]
      ) {
        return board[first] === board[second];
      }
    }
    return null;
  }
}
