import type { ServerToClientDTO } from "../models/dto/server-to-client-dto";
import { ServerToClientMessageType } from "../models/enums/server-to-client-message-type";
import type { GameService } from "./GameService";

export class ClientService {
  private clients: Set<WebSocket>;
  private _gameService: GameService;

  constructor(gameService: GameService) {
    this._gameService = gameService;
    this.clients = new Set<WebSocket>();
  }

  getClients() {
    return this.clients;
  }

  addClient(ws: WebSocket) {
    this.clients.add(ws);
  }

  deleteClient(ws: WebSocket) {
    this.clients.delete(ws);
  }

  numClients(): number {
    return this.clients.size;
  }

  /**
   * Broadcasts game state to all clients when updates occur
   */
  sendGameStateToAllClients(): void {
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

  sendNextWordToAllClients(): void {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: ServerToClientMessageType.NextWord,
            payload: this._gameService.gameState(),
          } as ServerToClientDTO)
        );
      }
    }
  }

  sendNewConnectionToAllClients(): void {
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

  sendTimeExpiredToAllClients(): void {
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

  sendRestartToAllClients(): void {
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
