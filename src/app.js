import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors'
import routes from './routes/index.route.js';

dotnev.config()

const app = express();

app.use(cors({
    origin: process.env.CORS
}))

app.use(express.json());


app.use('/api',routes)


export default app;