import express from "express";
import { getCards, getMulCards } from "../controllers/library.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const libraryRoutes = express.Router()

libraryRoutes.get('/',authenticate,getMulCards)
libraryRoutes.get('/:id',authenticate,getCards)

export default libraryRoutes