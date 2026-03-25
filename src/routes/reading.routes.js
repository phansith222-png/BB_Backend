import express from 'express';
import { aiInterpret, cut, initial, pick, shuffle } from '../controllers/reading.controller.js';
import { authenticate, optionalAuth } from '../middlewares/auth.middlewares.js';
import { dailyCheck } from '../middlewares/dailyCheck.middlewares.js';


const readingRoutes = express.Router()

readingRoutes.post('/init',optionalAuth,dailyCheck,initial)
readingRoutes.post('/shuffle',optionalAuth,shuffle)
readingRoutes.post('/cut',optionalAuth,cut)
readingRoutes.post('/pick',optionalAuth,pick)
readingRoutes.post('/ai-interpret',authenticate,aiInterpret)

export default readingRoutes
