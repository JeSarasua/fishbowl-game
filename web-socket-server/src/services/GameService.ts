const EMPTY_GAME_STATE: GameState = {
  url: "",
  isGameLive: true,
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
import type { WordService } from "./WordService";

const ROUND_LENGTH_MS = 30_000;

export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private wordService: WordService
  ) {}

  startGame() {
    this.newState();
    this.startTurn();
  }

  /**
   * Starts turn for a given team and initializes a timer.
   */
  startTurn() {
    const currentState = this.gameRepository.getState();

    const newTurn = this.switchTeam(currentState.turn);
    const newWord = this.wordService.getTopWord();

    this.gameRepository.updateState({
      ...currentState,
      turn: newTurn,
      word: newWord,
      roundEndsAt: Date.now() + ROUND_LENGTH_MS,
    });
  }

  /**
   * Switches turn. If team is empty (new game) then default to red.
   */
  switchTeam(team: string | undefined) {
    return !team || team === TeamColor.BLUE ? TeamColor.RED : TeamColor.BLUE;
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
