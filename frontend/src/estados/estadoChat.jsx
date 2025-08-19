import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { estadoAuth } from "./estadoAuth";

// Función auxiliar para comparar arrays de usuarios
const areUsersEqual = (users1, users2) => {
    if (!users1 || !users2) return false;
    if (users1.length !== users2.length) return false;
    
    return users1.every((user1, index) => {
        const user2 = users2[index];
        return user1._id === user2._id && 
               user1.username === user2.username && 
               user1.fotoPerfil === user2.fotoPerfil;
    });
};

export const estadoChat = create((set, get) => ({
    messages: [], //Tiempo real
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getUsers: async (showLoading = true) => {
        const { users: currentUsers } = get();
        
        try {
            if (showLoading && currentUsers.length === 0) {
                set({ isUsersLoading: true });
            }
            
            const res = await axiosInstance.get("/messages/users");
            const newUsers = res.data;
            
            // Solo actualizar si hay cambios reales
            if (!areUsersEqual(currentUsers, newUsers)) {
                set({ users: newUsers });
            }
            
        } catch (error) {
            if (showLoading) {
                toast.error(error.response.data.message);
            }
        } finally {
            set({ isUsersLoading: false });
        }
    },

    refreshUsers: async () => {
        const { getUsers } = get();
        await getUsers(false);
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    enviarMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/enviar/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // ver a tiempo real los mensajes
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = estadoAuth.getState().socket;
        socket.on("nuevoMessage", (nuevoMessage) => {
            if (nuevoMessage.emisorId !== selectedUser._id) return;
            set({
                messages: [...get().messages, nuevoMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = estadoAuth.getState().socket;
        socket.off("nuevoMessage");
    },
}));