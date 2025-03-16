import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { estadoAuth } from "./estadoAuth";

export const estadoChat = create((set, get) => ({
    messages: [], //Tiempo real
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
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

}))