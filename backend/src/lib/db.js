import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a la base de datos :D');
    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1);
    }
}