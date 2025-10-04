import { WebSocket, WebSocketServer, type RawData } from "ws";
import { WordService } from "./services/WordService";
import { WordRepository } from "./repositories/WordRepository";
import { GameService } from "./services/GameService";
import { GameRepository } from "./repositories/GameRepository";
import { ClientToServerMessageType } from "./enums/ClientToServerMessageType";
import { ServerToClientMessageType } from "./enums/ServerToClientMessageType";
import type {
  ServerToClientMessage,
  WordTally,
} from "./models/game-state-models";
import type { TeamColor } from "./enums/TeamColor";

const wss = new WebSocketServer({ port: 8800 });
const gameRepository = new GameRepository();
const clients = new Set<WebSocket>();
const wordRepository = new WordRepository();
const wordService = new WordService(wordRepository);
const gameService = new GameService(gameRepository, wordService);

const ROUND_LENGTH_MS = 30_000;

/**
 * Broadcasts game state to all clients when updates occur
 */
function sendGameStateToAllClients() {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: ServerToClientMessageType.State,
          payload: gameService.gameState(),
        } as ServerToClientMessage)
      );
    }
  }
}

function sendTimeExpiredToAllClients() {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: ServerToClientMessageType.TimeExpired,
          payload: gameService.gameState(),
        } as ServerToClientMessage)
      );
    }
  }
}

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
        case ClientToServerMessageType.NewConnection:
          wordService.addWords(data.payload);
          sendGameStateToAllClients();
          break;
        case ClientToServerMessageType.StartGame:
          wordService.buildWordQueue();
          gameService.startGame();

          sendGameStateToAllClients();
          setTimeout(sendTimeExpiredToAllClients, ROUND_LENGTH_MS);

          break;
        case ClientToServerMessageType.StartTurn:
          gameService.startTurn();
          sendGameStateToAllClients();
          setTimeout(sendTimeExpiredToAllClients, ROUND_LENGTH_MS);

          break;
        case ClientToServerMessageType.Tally:
          wordService.tallyWord(data.payload);
          gameService.addTally((data.payload as WordTally).team as TeamColor);

          sendGameStateToAllClients();
          break;
        case ClientToServerMessageType.Restart:
          wordService.buildWordQueue();
          gameService.startGame();

          sendGameStateToAllClients();
          setTimeout(sendTimeExpiredToAllClients, ROUND_LENGTH_MS);
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
