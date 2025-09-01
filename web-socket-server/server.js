import { WebSocketServer } from "ws";
import { GameState } from "./GameState.js";

const wss = new WebSocketServer({ port: 8800 });
const gameState = new GameState();
const clients = new Set();

/**
 * Broadcasts game state to all clients when updates occur
 */
function sendToAllClients(message) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify(gameState.getState()));

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    if (message.toString() === "restart") {
      gameState.newState();
      sendToAllClients(JSON.stringify(gameState.getState()));
    } else if (gameState.validMove(Number(message.toString()))) {
      const updatedState = gameState.move(Number(message.toString()));
      sendToAllClients(JSON.stringify(updatedState));
    } else {
      ws.send(
        JSON.stringify(
          gameState.error("Invalid move, please choose an empty square.")
        )
      );
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});
