import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectedDB } from './config/database.js';
import Authrouter from './Routes/auth.js';

dotenv.config()

const app = express();
const PORT = 4005;

connectedDB()

app.use(cors());
app.use(express.json())

// Fix: Add forward slash before 'api'
app.use('/api/v1', Authrouter);

app.listen(PORT, () => (
    console.log("Server is Running at Port " + PORT)
))