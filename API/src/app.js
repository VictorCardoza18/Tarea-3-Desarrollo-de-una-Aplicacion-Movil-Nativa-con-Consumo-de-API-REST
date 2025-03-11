import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.2:5173'],
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api', authRoutes)
app.use('/api', tasksRoutes)
app.use('/api', usuariosRoutes)

export default app;
