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
import storyRouter from './Routes/storyRoutes.js';
import settingRouter from './Routes/settingRouter.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4050;

connectedDB()
app.use(cookieParser())
app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://yaario-social-media-frontend.vercel.app",
    "https://*.vercel.app" // Allow all vercel preview deployments
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    credentials: true,
}));


// These are the all router detail

app.use('/api/v1', Authrouter); // authentication routers
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
app.use('/api/v1', authMiddleware, storyRouter)//edit profile details Routes
app.use('/api/v1', authMiddleware, settingRouter)//edit profile details Routes

app.listen(PORT, () => (
    console.log("Server is Running at Port " + PORT)
))