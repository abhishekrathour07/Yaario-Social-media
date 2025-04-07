import express from "express"
import { getSavedPosts, toggleSavePost } from "../Controller/savePost.js"

const savePostRouter = express.Router()

savePostRouter.put('/post/save',toggleSavePost);
savePostRouter.get('/post/get-savepost',getSavedPosts);


export default savePostRouter