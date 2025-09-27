import { WebSocket, WebSocketServer, type RawData } from "ws";
import { WordService } from "./services/WordService";
import { WordRepository } from "./repositories/WordRepository";
import { GameService } from "./services/GameService";
import { GameRepository } from "./repositories/GameRepository";
import { MessageType } from "./enums/MessageTypes";

const wss = new WebSocketServer({ port: 8800 });
const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);
const clients = new Set<WebSocket>();
const wordRepository = new WordRepository();
const wordService = new WordService(wordRepository, gameService);

/**
 * Broadcasts game state to all clients when updates occur
 */
// function sendToAllClients(message: string) {
//   for (const client of clients) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   }
// }

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  ws.send(JSON.stringify(gameService.gameState()));

  ws.on("message", (message: RawData) => {
    // Game play
    console.log("Received:", message.toString());

    // wordService.wordGuessed("apricot", "red");

    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case MessageType.Start:
          gameService.startGame();
          break;
        case MessageType.NewConnection:
          wordService.addWords(data.payload);
          break;
        case MessageType.Tally:
          wordService.tallyWord(data.payload);
          break;
        case MessageType.Restart:
          // TODO: Add Restart case
          break;
        default:
          ws.send(JSON.stringify({ type: "error", payload: "Unknown type" }));
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", payload: "Invalid JSON" }));
    }

    // if (message.toString() === "restart") {
    //   gameService.newState();
    //   sendToAllClients(JSON.stringify(gameService.gameState()));
    // } else if (gameService.validMove(Number(message.toString()))) {
    //   const updatedState = gameService.move(Number(message.toString()));
    //   sendToAllClients(JSON.stringify(updatedState));
    // } else {
    //   ws.send(
    //     JSON.stringify(
    //       gameService.error("Invalid move, please choose an empty square.")
    //     )
    //   );
    // }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});
