import express from 'express';
import authRoutes from './routes/auth.routes.js';
import errorMiddlewares from './middlewares/error.middlewares.js';
import cors from 'cors';
import readingRoutes from './routes/reading.routes.js';

const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/readings',readingRoutes)

app.use(errorMiddlewares)


export default app