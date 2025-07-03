import { io } from "socket.io-client";

const socket = io("https://retro-chat-server.onrender.com"); 
export default socket;
