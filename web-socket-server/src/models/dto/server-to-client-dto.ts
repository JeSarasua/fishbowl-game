import type { MessageDTO } from "./dto";
import type { GameState } from "../payload";
import type { ServerToClientMessageType } from "../enums/server-to-client-message-type";

/**
 * server->client DTOs which provide a specific payload for the type of DTO received from the client
 */
export type ServerToClientDTO =
  | MessageDTO<ServerToClientMessageType.Game, GameState>
  | MessageDTO<ServerToClientMessageType.TimeExpired, GameState>
  | MessageDTO<ServerToClientMessageType.NewConnection, {}>
  | MessageDTO<ServerToClientMessageType.Restart, GameState>;
