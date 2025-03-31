import express from "express";
import { login, signup } from "../Controller/authController.js";

const Authrouter = express.Router();

Authrouter.post('/signup',signup);
Authrouter.post('/login',login);

export default Authrouter