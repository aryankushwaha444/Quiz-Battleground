import { io } from "socket.io-client";

const socket = io("http://localhost:5010", {
  transports: ["websocket"], // optional
});

export default socket;
