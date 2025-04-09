import express from 'express';
import { login, logout, signup } from '../Controller/authcontroller.js';
import authMiddleware from '../Middleware/Authentication.js';

const router = express.Router();

router.post('/register', signup); 
router.post('/login', login);      

router.post('/logout', authMiddleware, logout);

export default router;