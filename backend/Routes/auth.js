import express from "express";
import { login, logout, signup } from "../Controller/authcontroller.js";

const Authrouter = express.Router();

Authrouter.post('/signup', signup);
Authrouter.post('/login', login);
Authrouter.post('/logout', logout);

export default Authrouter