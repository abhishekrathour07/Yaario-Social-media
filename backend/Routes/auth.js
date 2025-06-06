import express from 'express';
import { login, signup ,logout } from "../Controller/authController.js";
import authMiddleware from '../Middleware/Authentication.js';

const router = express.Router();

router.post('/register', signup); 
router.post('/login', login);      

router.post('/logout', authMiddleware, logout);

export default router;