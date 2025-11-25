import { WebSocketServer, type RawData } from "ws";
import { ClientToServerMessageType } from "./models/enums/client-to-server-message-type";
import type { TeamColor } from "./models/enums/team-color";
import type { ClientToServerDTO } from "./models/dto/client-to-server-dto";
import { rootProvider } from "./providers/root-provider";
import type { WordTally } from "./models/payload";

const wss = new WebSocketServer({ port: 8800 });
const ROUND_LENGTH_MS = 30_000;

wss.on("connection", (ws: WebSocket) => {
  rootProvider.clientService.clients.add(ws);
  const gameStateAtConnection = rootProvider.gameService.gameState();

  if (Object.keys(gameStateAtConnection).length > 0) {
    ws.send(JSON.stringify(gameStateAtConnection));
  }

  ws.on("message", (message: RawData) => {
    // Game play
    console.log("Received:", message.toString());

    try {
      const data = JSON.parse(message.toString()) as ClientToServerDTO;
      handleClientMessage(data);
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", payload: "Invalid JSON" }));
    }
  });

  ws.on("close", () => {
    rootProvider.clientService.clients.delete(ws);
  });
});

function handleClientMessage(dto: ClientToServerDTO) {
  switch (dto.type) {
    case ClientToServerMessageType.NewConnection:
      rootProvider.wordService.addWords(dto.payload);
      rootProvider.clientService.sendNewConnectionToAllClients();
      break;

    case ClientToServerMessageType.StartGame:
      rootProvider.wordService.buildWordQueue();
      rootProvider.gameService.startGame();

      rootProvider.clientService.sendGameStateToAllClients();
      setTimeout(
        rootProvider.clientService.sendTimeExpiredToAllClients,
        ROUND_LENGTH_MS
      );
      break;

    // case ClientToServerMessageType.StartTurn:
    //   gameService.startTurn();
    //   sendGameStateToAllClients();
    //   setTimeout(sendTimeExpiredToAllClients, ROUND_LENGTH_MS);

    //   break;
    case ClientToServerMessageType.Tally:
      if ((dto.payload as WordTally).correct) {
        console.log("CORRECT!");
        rootProvider.wordService.tallyWord(dto.payload);
        rootProvider.gameService.addTally(dto.payload.team as TeamColor);
      }

      rootProvider.gameService.nextWord();
      rootProvider.clientService.sendGameStateToAllClients();
      break;

    case ClientToServerMessageType.Restart:
      rootProvider.wordService.eraseWords();
      rootProvider.gameService.deleteState();

      rootProvider.clientService.sendRestartToAllClients();
      break;
    default:
    // ws.send(JSON.stringify({ type: "error", payload: "Unknown type" }));
  }
}
