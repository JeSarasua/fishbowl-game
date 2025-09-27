import path from "path";
import fs from "fs";

let filePath = "";

export class WordRepository {
  constructor(dbName: string) {
    filePath = path.join(__dirname, dbName);
  }
  getState() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  updateState(state: any) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(state, null, 2), "utf-8");
      console.log("Updated JSON written to", filePath);
    } catch (err) {
      console.error("Error writing:", err);
    }
  }
}
