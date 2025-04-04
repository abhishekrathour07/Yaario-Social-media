import express from "express";
import { createPost, deletePostById, getAllPostByUserId, getAllPosts } from "../Controller/postController.js";

const postRouter = express.Router();

postRouter.post('/create-post',createPost)
postRouter.get('/get-allpost',getAllPosts)
postRouter.get('/allpost/:userId',getAllPostByUserId);
postRouter.delete('/deletepost/:postId',deletePostById);

export default postRouter;

