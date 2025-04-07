import postModal from "../Models/postModel.js";
import responseHandler from "../utils/responseHandler.js";


const createComment = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { postId, commentText } = req.body;

        const post = await postModal.findById(postId);
        if (!post) {
           return responseHandler(res, 404, "Post not Found");
        }
        post.comment.push({ user: loggedInUserId, commentText });
        post.commentCount += 1;
        await post.save();
        return responseHandler(res, 200, "You comment on post")

    } catch (error) {
        console.log(error)
        return responseHandler(res, 500, "Internal Server Error")

    }
}

const getAllComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postModal.findById(postId).populate("comment.user", "name");

        if (!post) {
            return responseHandler(res, 404, "Post not Found");
        }

        return responseHandler(res, 200, "Comment data fetched Successfully", post.comment);

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
}


const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.body;
        const loggedInUserId = req.user._id;

        const post = await postModal.findById(postId);
        if (!post) {
            return responseHandler(res, 404, "Post not Found");
        }

        const comment = post.comment.find(comment => comment._id.toString() === commentId.toString());
       
        if (!comment) {
            return responseHandler(res, 404, "Comment not found");
        }

        //Only comment owner or post owner can delete the comment
        const isCommentOwner = comment.user.toString() === loggedInUserId.toString();
        const isPostOwner = post.userId.toString() === loggedInUserId.toString();

        if (!isCommentOwner && !isPostOwner) {
            return responseHandler(res, 403, "You are not authorized to delete this comment");
        }

        post.comment = post.comment.filter(comment => comment._id.toString() !== commentId.toString());
        post.commentCount = Math.max(0, post.commentCount - 1);
        await post.save();

        return responseHandler(res, 200, "Comment deleted successfully", post.comment);

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
}


export { createComment, getAllComments, deleteComment }