import jwt from "jsonwebtoken";

export const createAccessToken = (userId, res) => { 
    
    //Crear token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Mandar el token atraves de una cookie
    res.cookie("jwt_", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevenir ataques XSS y ataques de secuencias de comandos entre sitios
        sameSite: "strict", // para ataques CSRF: Ataques de falsificación de solicitudes entre sitios
        secure: process.env.NODE_ENV !== "development", // La cookie solo se envíe en conexiones HTTPS cuando la app está en producción.
    }); 

    return token;

};
