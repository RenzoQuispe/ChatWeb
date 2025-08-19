import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); //Se inicializa una aplicación
const server = http.createServer(app); //Se crea un servidor HTTP con http.createServer(app), necesario para integrar Socket.IO.

//Se instancia un servidor de Socket.IO (io) ligado al servidor HTTP.
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    // Desarrollo local con Vite
    if (origin.startsWith("http://localhost:5173")) return callback(null, true);
    const regexRedLocal = /^http:\/\/192\.168\.1\.\d{1,3}:5173$/;
    if (regexRedLocal.test(origin)) return callback(null, true);
    // Producción con Nginx en LAN
    if (/^http:\/\/192\.168\.1\.\d{1,3}$/.test(origin)) return callback(null, true);

    return callback(new Error("CORS no permitido desde este origen: " + origin));
  },
  credentials: true
};
const io = new Server(server, {
  cors: {
    origin: corsOptions
  },
});

// se utiliza para almacenar usuarios en línea
const userSocketMap = {}; // {userId: socketId}

//Permite obtener el socketId de un usuario en línea a partir de su userId.
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  const userId = socket.handshake.query.userId;

  // Validar que userId existe y no está vacío
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`Usuario ${userId} mapeado a socket ${socket.id}`);

    // Emitir lista de usuarios en línea
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  } else {
    console.log("Conexión sin userId válido:", socket.id);
  }

  // Manejar desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);

    // Buscar y eliminar el usuario del mapa
    for (const [id, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[id];
        console.log(`Usuario ${id} eliminado del mapa`);
        break;
      }
    }

    // Emitir lista actualizada de usuarios en línea
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };