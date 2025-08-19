import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import { NODE_PORT } from './config/env.js';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// CORS para red local
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
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(NODE_PORT, () => {
    console.log("Server ejecutandose en el puerto:" + NODE_PORT);
    connectDB();
});