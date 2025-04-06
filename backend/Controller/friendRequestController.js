import userModal from "../Models/userModal.js";
import responseHandler from "../utils/responseHandler.js";


const sendfriendRequest = async (req, res) => {
    const userId = req.user._id;
    const { friendId } = req.body;

    if (userId === friendId) {
        responseHandler(res, 400, "You cannot send request to yourself");
    }

    try {
        const loggedinUser = await userModal.findById(userId);
        const userToFollow = await userModal.findById(friendId);

        if (!loggedinUser || !userToFollow) {
            return responseHandler(res, 404, "User not found");
        }

        if (loggedinUser.followings.includes(friendId)) {
            return responseHandler(res, 400, "Friend Request Already send");
        }

        if (loggedinUser.followers.includes(friendId)) {
            return responseHandler(res, 400, "Friend Request received");

        }

        if (loggedinUser.followings.includes(friendId) || loggedinUser.followers.includes(friendId)) {
            return responseHandler(res, 400, "You are already friend");

        }

        loggedinUser.followings.push(friendId)
        userToFollow.followers.push(userId)
        await loggedinUser.save();
        await userToFollow.save();

        responseHandler(res, 200, "Friend Request send SuccessFully")

    } catch (error) {
        console.log(error)
        return responseHandler(res, 500, "Internal Server Error");
    }

}

const deleteFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const { friendId } = req.body;

    if (userId === friendId) {
        return responseHandler(res, 400, "You cannot Remove YourSelf");
    }

    try {
        const loggedinUser = await userModal.findById(userId);
        const userToFollow = await userModal.findById(friendId);

        if (!loggedinUser || !userToFollow) {
            return responseHandler(res, 404, "User not found");
        }

        if (!loggedinUser.followings.includes(friendId)) {
            return responseHandler(res, 400, "You are not following this user");
        }

        loggedinUser.followings = loggedinUser.followings.filter(
            (id) => id.toString() !== friendId.toString()
        );

        userToFollow.followers = userToFollow.followers.filter(
            (id) => id.toString() !== userId.toString()
        );

        await loggedinUser.save();
        await userToFollow.save();

        return responseHandler(res, 200, "Friend Request deleted SuccessFully")

    } catch (error) {
        console.log(error)
        return responseHandler(res, 500, "Internal Server Error");
    }

}

const getAllFriendRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        if (!loggedInUserId) {
            responseHandler(res, 404, "User Not Found");
        }

        const loggedInUser = await userModal.findById(loggedInUserId).select("followings followers");

        const userTOAcceptRequest = await userModal.find({
            _id: {
                $in: loggedInUser.followers,
                $nin: loggedInUser.followings,
            }
        }).select("avatar name email")

        return responseHandler(res,200, "Data fetched SuccessFully", userTOAcceptRequest);


    } catch (error) {
        console.log(error)
        return responseHandler(res, 500, "Internal Server Error");
    }
}


export { sendfriendRequest, deleteFriendRequest, getAllFriendRequest }