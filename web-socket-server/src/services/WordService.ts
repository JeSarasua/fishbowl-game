import type { NewConnection, WordTally } from "../models/payload";
import { WordRepository } from "../repositories/WordRepository";
import { WordQueue } from "./WordQueue";

export class WordService {
  constructor(private wordRepository: WordRepository) {}

  private wordQueue = new WordQueue();

  eraseWords() {
    this.wordRepository.updateWords([]);
  }

  tallyWord(tally: WordTally) {
    this.wordRepository.updateWords(
      this.wordRepository
        .getWords()
        .map((w) => (w.name === tally.name ? { ...w, team: tally.team } : w))
    );
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

  buildWordQueue() {
    const wordTallies = this.wordRepository.getWords();
    this.wordQueue.populateWords(
      wordTallies.map((wordTally) => wordTally.name)
    );
  }

  getTopWord() {
    if (!this.wordQueue.queue.isEmpty()) {
      return this.wordQueue.queue.dequeue();
    }
  }
}
