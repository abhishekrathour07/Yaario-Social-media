import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectedDB } from './config/database.js';
import Authrouter from './Routes/auth.js';
import postRouter from './Routes/post.js';
import authMiddleware from './Middleware/Authentication.js';

dotenv.config()

const app = express();
const PORT = 4005;

connectedDB()
app.use(cookieParser())
app.use(cors());
app.use(express.json())

// Fix: Add forward slash before 'api'
app.use('/api/v1', Authrouter);

app.use('/api/v1', authMiddleware, postRouter)

app.listen(PORT, () => (
    console.log("Server is Running at Port " + PORT)
))