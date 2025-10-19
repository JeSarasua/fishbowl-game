import type { ServerToClientDTO } from "../models/dto/server-to-client-dto";
import { ServerToClientMessageType } from "../models/enums/server-to-client-message-type";
import { ROOT_PROVIDER } from "../providers/root-provider";
import type { GameService } from "./GameService";

export class ClientService {
  public clients: Set<WebSocket>;
  private _gameService: GameService;

  constructor(gameService: GameService) {
    this._gameService = gameService;
    this.clients = new Set<WebSocket>();
  }

  /**
   * Broadcasts game state to all clients when updates occur
   */
  sendGameStateToAllClients() {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: ServerToClientMessageType.Game,
            payload: this._gameService.gameState(),
          } as ServerToClientDTO)
        );
      }
    }
  }

  sendNewConnectionToAllClients() {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: ServerToClientMessageType.NewConnection,
            payload: {},
          } as ServerToClientDTO)
        );
      }
    }
  }

  sendTimeExpiredToAllClients() {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: ServerToClientMessageType.TimeExpired,
            payload: this._gameService.gameState(),
          } as ServerToClientDTO)
        );
      }
    }
  }

  sendRestartToAllClients() {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: ServerToClientMessageType.Restart,
            payload: this._gameService.gameState(),
          } as ServerToClientDTO)
        );
      }
    }
  }
}
