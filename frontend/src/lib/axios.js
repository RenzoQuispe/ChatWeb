import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: ["development", "localserver"].includes(import.meta.env.MODE) ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});