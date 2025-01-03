import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL); // Replace with your backend URL

export const registerUser = (userId) => {
  socket.emit("register-user", userId);
};

export const joinChat = (roomId) => {
  socket.emit("join-chat", roomId);
};

export const sendMessage = (messageData) => {
  socket.emit("send-message", messageData);
};

export const receiveMessage = (callback) => {
  socket.on("receive-message", callback);
};

export const updateOnlineUsers = (callback) => {
  socket.on("update-online-users", callback);
};

export const checkOnlineStatus = (callback) => {
  socket.on("check-online", callback);
};

export default socket;