import postModal from "../Models/postModel.js";
import responseHandler from "../utils/responseHandler.js";

const sharePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const loggedInUserId = req.user._id;

        const post = await postModal.findById(postId);
        if (!post) {
            return responseHandler(res, 404, "Post not found");
        }

        post.share.push({ user: loggedInUserId });
        post.shareCount += 1;
        await post.save(); 

        return responseHandler(res, 200, "Post shared successfully", post);

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

export default sharePost;
