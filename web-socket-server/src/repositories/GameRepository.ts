import { readFileSync, writeFileSync } from "fs";
import { type GameState } from "../models/game-state-models.js";

const filePath = "./web-socket-server/src/repositories/gameState.json";

export class GameRepository {
  constructor() {}

  getState() {
    return JSON.parse(readFileSync(filePath, "utf-8")) as GameState;
  }

  updateState(state: GameState) {
    try {
      writeFileSync(filePath, JSON.stringify(state, null, 2), "utf-8");
      console.log("Updated JSON written to", filePath);
    } catch (err) {
      console.error("Error writing:", err);
    }
  }
}
