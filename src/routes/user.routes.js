import express from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { deleteSavedReading, getHistory, getMe, getReading, saveReading, updateMe } from "../controllers/user.controller.js";


const userRoutes = express.Router()

userRoutes.get('/me',authenticate,getMe)
userRoutes.patch('/me',authenticate,updateMe)

userRoutes.get('/history',authenticate,getHistory)
userRoutes.post('/saved-readings',authenticate,saveReading)
userRoutes.get('/saved-readings',authenticate,getReading)
userRoutes.delete('/saved-readings/:id',authenticate,deleteSavedReading)

export default userRoutes