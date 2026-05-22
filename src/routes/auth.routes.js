import express from "express";
import { login, register, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/reset-password', resetPassword)

export default authRoutes