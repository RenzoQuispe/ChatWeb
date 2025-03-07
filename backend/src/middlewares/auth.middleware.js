import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_; // "jwt_" creado en jwt_utils.js(mandado el token atraves de cookies)
        if (!token) return res.status(401).json({ message: "Ruta no autorizada - No hay token :/" })

        const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenDecodificado) return res.status(401).json({ message: "Ruta no autorizada - Token Invalido :/" })

        const user = await User.findById(tokenDecodificado.userId).select("-password"); // Traer los datos excepto el "password" por seguridad
        if (!user) return res.status(404).json({ message: "User no encontrado" });

        req.user = user;
        
        next();
 
    } catch (error) {
        console.log("Error en protectRoute", error.message);
        res.status(500).json({ message: "Server error" });
    }
}