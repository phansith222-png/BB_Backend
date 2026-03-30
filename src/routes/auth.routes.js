import express from "express";
import { login, register} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const authRoutes = express.Router()

authRoutes.post('/register',register)
authRoutes.post('/login',login)



export default authRoutes