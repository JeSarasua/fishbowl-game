import type { TeamColor } from "../enums/TeamColor";
import type { NewConnection, WordTally } from "../models/game-state-models";
import { WordRepository } from "../repositories/WordRepository";
import type { GameService } from "./GameService";

export class WordService {
  constructor(
    private wordRepository: WordRepository,
    private gameService: GameService
  ) {}

  eraseWords() {
    this.wordRepository.updateWords([]);
  }

  tallyWord(tally: WordTally) {
    this.wordRepository.updateWords(
      this.wordRepository
        .getWords()
        .map((w) => (w.name === tally.name ? { ...w, team: tally.team } : w))
    );

    this.gameService.addTally(tally.team as TeamColor);
  }

  addWords(newConnection: NewConnection) {
    const updatedWordTallies = [
      ...newConnection.words.map((word) => ({
        name: word,
        player: newConnection.player,
        team: "",
      })),
      ...this.wordRepository.getWords(),
    ];
    this.wordRepository.updateWords(updatedWordTallies);
  }
}
