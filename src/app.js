import express from 'express';
import authRoutes from './routes/auth.routes.js';
import errorMiddlewares from './middlewares/error.middlewares.js';
import cors from 'cors';
import readingRoutes from './routes/reading.routes.js';
import userRoutes from './routes/user.routes.js';
import notfoundMiddlewares from './middlewares/notfound.middlewares.js';
import libraryRoutes from './routes/library.routes.js';
import helmet from 'helmet';

const app = express()

app.use(helmet())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/readings',readingRoutes)

app.use('/api/cards',libraryRoutes)

app.use('/api/users',userRoutes)


app.use(notfoundMiddlewares)

app.use(errorMiddlewares)


export default app