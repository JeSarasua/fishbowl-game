import type { MessageDTO } from "./dto";
import type { NewConnection, WordTally } from "../payload";
import type { ClientToServerMessageType } from "../enums/client-to-server-message-type";

/**
 * client->server DTOs which provide a specific payload for the type of DTO received from the client
 */
export type ClientToServerDTO =
  | MessageDTO<ClientToServerMessageType.Tally, WordTally>
  | MessageDTO<ClientToServerMessageType.NewConnection, NewConnection>
  | MessageDTO<ClientToServerMessageType.StartGame, {}>
  | MessageDTO<ClientToServerMessageType.Restart, {}>;
