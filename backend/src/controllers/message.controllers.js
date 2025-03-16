import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: otroUser } = req.params;
        const miId = req.user._id;

        const mensajes = await Message.find({
            $or: [
                { emisorId: miId, receptorId: otroUser },
                { emisorId: otroUser, receptorId: miId },
            ],
        });

        res.status(200).json(mensajes);
    } catch (error) {
        console.log("Error ver mensajes: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receptorId } = req.params;
        const emisorId = req.user._id;

        let imageUrl;
        if (image) {
            // Subir imagen a cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const nuevoMessage = new Message({
            emisorId,
            receptorId,
            text,
            image: imageUrl,
        });
        await nuevoMessage.save();

        // Socket.io para la comunicacion en tiempo real
        const receiverSocketId = getReceiverSocketId(receptorId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("nuevoMessage", nuevoMessage);
        }
        
        res.status(201).json(nuevoMessage);
    } catch (error) {
        console.log("Error al intentar enviar mensaje: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
};