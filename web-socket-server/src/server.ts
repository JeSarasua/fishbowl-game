import { WebSocketServer, type RawData } from "ws";
import { ClientToServerMessageType } from "./models/enums/client-to-server-message-type";
import type { TeamColor } from "./models/enums/team-color";
import type { ClientToServerDTO } from "./models/dto/client-to-server-dto";
import { ROOT_PROVIDER } from "./providers/root-provider";

const wss = new WebSocketServer({ port: 8800 });
const ROUND_LENGTH_MS = 30_000;

wss.on("connection", (ws: WebSocket) => {
  ROOT_PROVIDER.clientService.clients.add(ws);
  const gameStateAtConnection = ROOT_PROVIDER.gameService.gameState();

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
    ROOT_PROVIDER.clientService.clients.delete(ws);
  });
});

function handleClientMessage(dto: ClientToServerDTO) {
  switch (dto.type) {
    case ClientToServerMessageType.NewConnection:
      ROOT_PROVIDER.wordService.addWords(dto.payload);
      ROOT_PROVIDER.clientService.sendNewConnectionToAllClients();
      break;

    case ClientToServerMessageType.StartGame:
      ROOT_PROVIDER.wordService.buildWordQueue();
      ROOT_PROVIDER.gameService.startGame();

      ROOT_PROVIDER.clientService.sendGameStateToAllClients();
      setTimeout(
        ROOT_PROVIDER.clientService.sendTimeExpiredToAllClients,
        ROUND_LENGTH_MS
      );
      break;

    // case ClientToServerMessageType.StartTurn:
    //   gameService.startTurn();
    //   sendGameStateToAllClients();
    //   setTimeout(sendTimeExpiredToAllClients, ROUND_LENGTH_MS);

    //   break;
    case ClientToServerMessageType.Tally:
      ROOT_PROVIDER.wordService.tallyWord(dto.payload);
      ROOT_PROVIDER.gameService.addTally(dto.payload.team as TeamColor);

      ROOT_PROVIDER.clientService.sendGameStateToAllClients();
      break;

    case ClientToServerMessageType.Restart:
      ROOT_PROVIDER.wordService.eraseWords();
      ROOT_PROVIDER.gameService.deleteState();

      ROOT_PROVIDER.clientService.sendRestartToAllClients();
      break;
    default:
    // ws.send(JSON.stringify({ type: "error", payload: "Unknown type" }));
  }
}
