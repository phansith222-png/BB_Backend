import express from 'express';
import { initial } from '../controllers/reading.controller.js';
import { authenticate } from '../middlewares/auth.middlewares.js';
import { dailyCheck } from '../middlewares/dailyCheck.middlewares.js';


const readingRoutes = express.Router()

readingRoutes.post('/init',authenticate,dailyCheck,initial)

export default readingRoutes
