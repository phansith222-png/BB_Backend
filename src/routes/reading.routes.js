import express from 'express';
import { aiInterpret, cut, generateShareImage, getSpread, getSpreadId, initial, pick, shuffle } from '../controllers/reading.controller.js';
import { optionalAuth } from '../middlewares/auth.middlewares.js';
import { dailyCheck } from '../middlewares/dailyCheck.middlewares.js';


const readingRoutes = express.Router()

readingRoutes.post('/init',optionalAuth,dailyCheck,initial)
readingRoutes.post('/shuffle',optionalAuth,shuffle)
readingRoutes.post('/cut',optionalAuth,cut)
readingRoutes.post('/pick',optionalAuth,pick)
readingRoutes.get('/spread',optionalAuth,getSpread)
readingRoutes.get('/spread/:id',optionalAuth,getSpreadId)
readingRoutes.post('/ai-interpret',optionalAuth,aiInterpret)
readingRoutes.get('/share-image/:readingId',optionalAuth,generateShareImage)

export default readingRoutes
