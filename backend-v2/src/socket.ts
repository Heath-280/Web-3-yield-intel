import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(
      "https://web-3-yield-intel.onrender.com",
      {
        transports: ["websocket"],
      }
    );
  }
  return socket;
}
