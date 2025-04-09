import express from "express";
import { createPost, deletePostById, getAllPostByUserId, getAllPosts } from "../Controller/postController.js";
import multer from "multer";

const postRouter = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

postRouter.post('/create-post',upload.single("postImageUrl"),createPost)
postRouter.get('/get-allpost', getAllPosts)
postRouter.get('/allpost/:userId', getAllPostByUserId);
postRouter.delete('/deletepost/:postId', deletePostById);

export default postRouter;

