import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

export const estadoAuth = create((set) => ({
    authUser: null,
    isCheckingAuth: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingprofile: false,
    onlineUsers: [],
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
            //get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Cuenta crada :D");
            //get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout correctamente :D");
            //get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logeao exitoso :D");

            //get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    actualizarPerfil: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/actualizarPerfil", data);
            set({ authUser: res.data });
            toast.success("Actualizacion exitosa :D");
        } catch (error) {
            console.log("Error al actualizar datos :/ ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
})); 