import jwt from "jsonwebtoken";
import { JWT_SECRET, VITE_DEPLOY_MODE } from "../config/env.js";

export const createAccessToken = (userId, res) => {

    //Crear token
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    // Mandar el token atraves de una cookie
    res.cookie("jwt_", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: !["AnsibleNginx", "LocalServerDocker"].includes(VITE_DEPLOY_MODE), // Solo enviar la cookie a través de HTTPS en producción (No en despliegue local)
    });

    return token;

};
