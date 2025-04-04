import responseHandler from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudinary.js";
import postModal from "../Models/postModel.js";

const createPost = async (req, res) => {

    try {
        const userId = req.user._id;
        const { caption } = req.body;
        const postImageUrl = req.file;

        let mediaUrl = null;
        let mediaType = null;

        if (postImageUrl) {
            const uploadToCloudinary = await uploadFileToCloudinary(postImageUrl);
            mediaUrl = uploadToCloudinary?.secure_url;
            mediaType = postImageUrl.mimetype.startsWith("video") ? "video" : "image";
        }

        const newPost = new postModal({
            userId,
            caption,
            postImageUrl: mediaUrl,
            mediaType,
            likeCount: 0,
            commentCount: 0,
            shareCount: 0,
        });

        await newPost.save();
        return responseHandler(res, 200, "Post created successfully", newPost);

    } catch (error) {
        console.error("Error in createPost:", error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const getAllPostByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await postModal.find({ userId }).sort({createdAt:-1}).populate("userId", "name");
        return responseHandler(res, 200, "Posts fetched successfully", posts);
    } catch (error) {
        console.error("Error in getPostByUserId:", error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const deletePostById = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await postModal.findById(postId);

        if(!post){
            return responseHandler(res,404,"Post not found");
        }

        if(post.userId.toString() !== userId.toString()){
            return responseHandler(res,403,"You are not authorized to delete this post");
        }
        await post.deleteOne();
        return responseHandler(res,200,"Post deleted successfully");
    } catch (error) {
        console.error("Error in deletePostById:", error);
        return responseHandler(res, 500, "Internal Server Error");
    }
}


const getAllPosts = async (req, res) => {
    try {
        const posts = await postModal.find().sort({createdAt:-1}).populate("userId", "name");
        return responseHandler(res, 200, "Posts fetched successfully", posts);
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};


export { createPost, getAllPosts,getAllPostByUserId,deletePostById };

