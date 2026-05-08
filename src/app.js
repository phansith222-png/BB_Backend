import express from 'express';
import authRoutes from './routes/auth.routes.js';
import errorMiddlewares from './middlewares/error.middlewares.js';
import cors from 'cors';
import readingRoutes from './routes/reading.routes.js';
import userRoutes from './routes/user.routes.js';
import notfoundMiddlewares from './middlewares/notfound.middlewares.js';
import libraryRoutes from './routes/library.routes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS',
    message: { status: 429, message: 'Too many requests, please try again later.' }
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS',
    message: { status: 429, message: 'Too many requests, please try again later.' }
})

const app = express()

app.use(helmet())

const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://bb-frontend-sigma.vercel.app',
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173'] : []),
]

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json({ limit: '10kb' }))

app.use('/api/auth', authLimiter)
app.use('/api', apiLimiter)

app.use('/api/auth', authRoutes)

app.use('/api/readings', readingRoutes)

app.use('/api/cards', libraryRoutes)

app.use('/api/users', userRoutes)


app.use(notfoundMiddlewares)

app.use(errorMiddlewares)


export default app