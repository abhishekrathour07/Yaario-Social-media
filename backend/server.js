import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectedDB } from './config/database.js';
import Authrouter from './Routes/auth.js';
import postRouter from './Routes/post.js';
import authMiddleware from './Middleware/Authentication.js';
import SuggestionRouter from './Routes/suggestion.js';
import requestRouter from './Routes/request.js';
import bioRouter from './Routes/bioRoutes.js';
import likeRouter from './Routes/likeRouter.js';
import commentRouter from './Routes/commentRouter.js';
import shareRouter from './Routes/shareRoutes.js';
import savePostRouter from './Routes/savePostRoutes.js';
import editProfileRouter from './Routes/editProfileRoutes.js';
import notificationRouter from './Routes/notifcationRoutes.js';

dotenv.config()

const app = express();
const PORT = 4005;

connectedDB()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())

// These are the all router detail

app.use('/api/v1/auth', Authrouter); // authentication routers
app.use('/api/v1', authMiddleware, postRouter) // post routers
app.use('/api/v1', authMiddleware, SuggestionRouter) //suggestions Routers
app.use('/api/v1', authMiddleware, bioRouter) //Bio details Routers
app.use('/api/v1', authMiddleware, likeRouter) //like and dislike on post
app.use('/api/v1', authMiddleware, commentRouter) //comment and delete comment on post
app.use('/api/v1', authMiddleware, shareRouter) //comment and delete comment on post
app.use('/api/v1', authMiddleware, requestRouter)//share a post Routes
app.use('/api/v1', authMiddleware, savePostRouter)//share a post Routes
app.use('/api/v1', authMiddleware, editProfileRouter)//edit profile details Routes
app.use('/api/v1', authMiddleware, notificationRouter)//edit profile details Routes

app.listen(PORT, () => (
    console.log("Server is Running at Port " + PORT)
))