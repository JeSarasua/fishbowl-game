/**
 * Generic DTO structure for client->server DTOs and server->client DTOs
 */
export interface MessageDTO<TType extends string, TPayload> {
  type: TType;
  payload: TPayload;
}
