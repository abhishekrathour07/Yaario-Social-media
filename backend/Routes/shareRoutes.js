import express from "express";
import sharePost from "../Controller/shareController.js";

const shareRouter = express.Router();

shareRouter.put("/post/share", sharePost)

export default shareRouter