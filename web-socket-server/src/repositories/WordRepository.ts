import { readFileSync, writeFileSync } from "fs";
import { type WordTally } from "../models/payload";

const filePath = "./web-socket-server/src/repositories/wordstate.json";

export class WordRepository {
  constructor() {}

  getWords() {
    return JSON.parse(readFileSync(filePath, "utf-8")) as WordTally[];
  }

  updateWords(words: WordTally[]) {
    try {
      writeFileSync(filePath, JSON.stringify(words, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing:", err);
    }
  }
}
