import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conexion = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conexion.connection.host}`);
    } catch (error) {
        console.log("MongoDB no conectado :c ", error)
    }
}