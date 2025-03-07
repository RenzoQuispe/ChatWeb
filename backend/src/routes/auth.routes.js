import express from "express";
import { register, login, logout, updateProfile, checkAuth } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile",protectRoute, updateProfile);
router.get("/check",protectRoute, checkAuth);

export default router; 