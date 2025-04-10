import savedPostModel from "../Models/savedPostModel.js";
import postModel from "../Models/postModel.js";
import responseHandler from "../utils/responseHandler.js";

const toggleSavePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const loggedInUserId = req.user._id;

        const post = await postModel.findById(postId);
        if (!post) {
            return responseHandler(res, 404, "Post not found");
        }

        const savedPost = await savedPostModel.findOne({ userId: loggedInUserId, post: postId });

        if (savedPost) {
            // Simply delete it, don't toggle isSaved
            await savedPostModel.deleteOne({ userId: loggedInUserId, post: postId });
            return responseHandler(res, 200, "Post unsaved successfully");
        } else {
            // Save it fresh
            await savedPostModel.create({
                userId: loggedInUserId,
                post: postId,
                isSaved: true,
            });
            return responseHandler(res, 200, "Post saved successfully");
        }

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const getSavedPosts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { postId } = req.body
        const savedPosts = await savedPostModel
            .find({ userId: loggedInUserId, isSaved: true, postId })
            .populate({
                path: "post",
                populate: {
                    path: "userId",
                    select: "name avatar",
                },
            });

        // Combine post details and isSaved flag
        const posts = savedPosts.map((item) => ({
            ...item.post.toObject(),  // convert Mongoose doc to plain object
            isSaved: item.isSaved     // append isSaved value
        }));

        return responseHandler(res, 200, "Saved posts fetched successfully", posts);
    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};



export { toggleSavePost, getSavedPosts };
