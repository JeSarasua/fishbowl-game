const EMPTY_GAME_STATE: GameState = {
  url: "",
  winner: "",
  turn: undefined,
  score: {
    red: 0,
    blue: 0,
  },
  word: "",
  roundEndsAt: 0,
  error: "",
};

import { GameRepository } from "../repositories/GameRepository";
import { type GameState } from "../models/game-state-models";
import { TeamColor } from "../enums/TeamColor";

const ROUND_LENGTH_MS = 30_000;

export class GameService {
  constructor(private gameRepository: GameRepository) {}

  startGame() {
    this.newState();
    this.startTurn();
  }

  /**
   * Starts turn for a given team and initializes a timer.
   */
  startTurn() {
    const currentState = this.gameRepository.getState();

    this.gameRepository.updateState({
      ...currentState,
      turn: this.switchTeam(currentState.turn),
      roundEndsAt: Date.now() + ROUND_LENGTH_MS,
    });
    setTimeout(this.suspendTurn, ROUND_LENGTH_MS);
  }

  /**
   * Switches turn. If team is empty (new game) then default to red.
   */
  switchTeam(team: string | undefined) {
    return !team || team === TeamColor.BLUE ? TeamColor.RED : TeamColor.BLUE;
  }

  suspendTurn() {
    // FIXME: Add break time in-between turns

    this.startTurn();
  }

  newState() {
    this.gameRepository.updateState(EMPTY_GAME_STATE);
  }

  addTally(team: TeamColor) {
    const currentState = this.gameRepository.getState();

    const newScore = {
      ...currentState.score,
      [team]: currentState.score[team] + 1, // dynamically increment
    };

    this.gameRepository.updateState({
      ...currentState,
      score: newScore,
    });
  }

  gameState(): GameState {
    return this.gameRepository.getState();
  }
}
