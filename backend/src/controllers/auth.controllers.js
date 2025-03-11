import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../lib/jwt_utils.js";
import cloudinary from "../lib/cloudinary.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "usernmame, email y password requeridos!!!!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres :/ " });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "El email ya es usado :/" });

        const passwordHash = await bcrypt.hash(password, 10); // encripta la contraseña con un algoritmo usado 10 veces

        // Creamos el nuevo usuario
        const nuevoUser = new User({
            username,
            email,
            password: passwordHash,
        });

        // Tras comprobar que "nuevoUser" es valido
        if (nuevoUser) {
            // crear jwt token y mandarlo atraves de una cookie
            createAccessToken(nuevoUser._id, res);
            // crear nuevo usario en la bd
            await nuevoUser.save();
            res.status(201).json({
                _id: nuevoUser._id,
                username: nuevoUser.username,
                email: nuevoUser.email,
                fotoPerfil: nuevoUser.fotoPerfil,
            });
        } else {
            res.status(400).json({ message: "Data invalida para nuevo Usuario :/" });
        }

    } catch (error) {
        console.log("Error en Register controller", error.message);
        res.status(500).json({ message: "Error en Register controller" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "email invalido :/" });
        }

        const esPasswordCorrecto = await bcrypt.compare(password, user.password);
        if (!esPasswordCorrecto) {
            return res.status(400).json({ message: "Contraseña incorrecta :/" });
        }

        createAccessToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fotoPerfil: user.fotoPerfil,
        });
    } catch (error) {
        console.log("Error login", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt_", "", { maxAge: 0 }); // "jwt_" definido en jwt_utils.js
        res.status(200).json({ message: "Cerró cesión correactamente :D" });
    } catch (error) {
        console.log("Error logout", error.message);
        res.status(500).json({ message: "Server Error :/" });
    }
};

export const actualizarPerfil = async (req, res) => {
    try {
        const { fotoPerfil } = req.body;
        const userId = req.user._id;

        if (!fotoPerfil) {
            return res.status(400).json({ message: "Foto de perfil requerida :/" });
        }

        const uploadRespuesta = await cloudinary.uploader.upload(fotoPerfil); // sube la imagen a Cloudinary y devuelve un objeto con datos sobre la imagen subida.
        //Actualizar la base de datos
        const UserActualizado = await User.findByIdAndUpdate(
            userId,
            { fotoPerfil: uploadRespuesta.secure_url },
            { new: true }
        );
        res.status(200).json(UserActualizado);

    } catch (error) {
        console.log("Error al actualizar Perfil:", error);
        res.status(500).json({ message: "Server error" });
    }
}
 
export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error checkAuth", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };