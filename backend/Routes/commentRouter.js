import express from 'express'
import { createComment, deleteComment, getAllComments } from '../Controller/commentController.js';

const commentRouter = express.Router()

commentRouter.post("/post/create-comment", createComment);
commentRouter.get("/post/getall-comment/:postId", getAllComments);
commentRouter.delete("/post/delete-comment", deleteComment);

export default commentRouter