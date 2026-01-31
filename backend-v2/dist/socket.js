"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = getSocket;
const socket_io_client_1 = require("socket.io-client");
let socket = null;
function getSocket() {
    if (!socket) {
        socket = (0, socket_io_client_1.io)("https://web-3-yield-intel.onrender.com", {
            transports: ["websocket"],
        });
    }
    return socket;
}
