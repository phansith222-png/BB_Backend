import express from "express";
import { getMe, login, register, updateMe } from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.get('/users/me',getMe)
authRoutes.put('/users/me',updateMe)


export default authRoutes