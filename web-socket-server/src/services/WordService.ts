// const EMPTY_WORD_STATE = {
//   words: [
//     // { name: "bannana", team: "blue" },
//     // { name: "orange", team: "red" },
//     // { name: "licorice", team: "red" },
//     // { name: "dog", team: "red" },
//     // { name: "apricot", team: "" },
//   ],
// };

import type { NewConnection, WordTally } from "../models/game-state-models";
import { WordRepository } from "../repositories/WordRepository";

export class WordService {
  constructor(private wordRepository: WordRepository) {}

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
}
