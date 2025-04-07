import postModal from "../Models/postModel.js";
import responseHandler from "../utils/responseHandler.js";

const like = async (req, res) => {
    try {
        const loggedInuserId = req.user._id;
        const { postId } = req.body;

        const post = await postModal.findById(postId);
        if (!post) {
            return responseHandler(res, 404, "Post not found");
        }

        // Check if user already liked
        const alreadyLiked = post.like.some(like => like.user.toString() === loggedInuserId.toString());

        if (alreadyLiked) {

            post.like = post.like.filter(like => like.user.toString() !== loggedInuserId.toString());
            post.likeCount = Math.max(0, post.likeCount - 1);
            await post.save();

            return responseHandler(res, 200, "Post disliked successfully", post);
        } else {

            post.like.push({ user: loggedInuserId });
            post.likeCount += 1;
            await post.save();

            return responseHandler(res, 200, "Post liked successfully", post);
        }

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
}

export { like };
