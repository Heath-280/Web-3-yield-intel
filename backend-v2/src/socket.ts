import { Server } from "socket.io";

let io: Server | null = null;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", () => {
    console.log("🟢 Client connected");
  });
}

export function broadcast(event: string, data: any) {
  if (!io) return;
  io.emit(event, data);
}
