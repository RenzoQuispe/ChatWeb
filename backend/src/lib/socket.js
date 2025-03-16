import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); //Se inicializa una aplicación
const server = http.createServer(app); //Se crea un servidor HTTP con http.createServer(app), necesario para integrar Socket.IO.
//Se instancia un servidor de Socket.IO (io) ligado al servidor HTTP.
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// se utiliza para almacenar usuarios en línea
const userSocketMap = {}; // {userId: socketId}

//Permite obtener el socketId de un usuario en línea a partir de su userId.
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => { //Cuando un usuario se conecta
  console.log("Se conectado", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  // io.emit() se utiliza para enviar eventos a todos los clientes conectados
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //Cuando un usuario se desconecta:
  socket.on("disconnect", () => {
    console.log("Se desconectado", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, app, server };

/*
 ¿Qué hace este código?
Inicia un servidor Express y Socket.IO.
Registra usuarios en línea mediante userSocketMap.
Emite la lista de usuarios en línea a todos los clientes.
Elimina usuarios desconectados y actualiza la lista.
*/