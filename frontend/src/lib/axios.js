import axios from "axios";

const baseURL = (() => {
  switch (import.meta.env.VITE_DEPLOY_MODE) {
    case "AnsibleNginx":
      return "/api";
    case "LocalServerDocker":
      return import.meta.env.VITE_API_URL + "/api";
    default:
      return "http://localhost:3000/api";
  }
})();

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});