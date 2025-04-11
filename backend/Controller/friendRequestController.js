import userModal from "../models/userModal.js";
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
    try {
        const loggedInUserId = req.user._id;
        const { friendId } = req.body;

        const loggedInUser = await userModal.findById(loggedInUserId);
        const senderUser = await userModal.findById(friendId);

        if (!loggedInUser || !senderUser) {
            return responseHandler(res, 404, "User not found");
        }

        const isPendingRequest = loggedInUser.followers.includes(friendId);

        if (!isPendingRequest) {
            return responseHandler(res, 400, "No pending friend request from this user");
        }

        // Remove from followers and followings
        loggedInUser.followers = loggedInUser.followers.filter(
            (id) => id.toString() !== friendId.toString()
        );

        senderUser.followings = senderUser.followings.filter(
            (id) => id.toString() !== loggedInUserId.toString()
        );

        await loggedInUser.save();
        await senderUser.save();

        return responseHandler(res, 200, "Friend request rejected successfully");
    } catch (error) {
        console.error(error);
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
        }).select("avatar name email createdAt")

        return responseHandler(res, 200, "Data fetched SuccessFully", userTOAcceptRequest);


    } catch (error) {
        console.log(error)
        return responseHandler(res, 500, "Internal Server Error");
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { friendId } = req.body;

        if (loggedInUserId.toString() === friendId.toString()) {
            return responseHandler(res, 400, "You cannot accept your own request");
        }

        const loggedInUser = await userModal.findById(loggedInUserId);
        const senderUser = await userModal.findById(friendId);

        if (!loggedInUser || !senderUser) {
            return responseHandler(res, 404, "User not found");
        }

        // Ensure that the sender actually sent a request
        const isPendingRequest = loggedInUser.followers.includes(friendId);
        if (!isPendingRequest) {
            return responseHandler(res, 400, "No pending friend request from this user");
        }

        // Accept request → You follow them back
        if (!loggedInUser.followings.includes(friendId)) {
            loggedInUser.followings.push(friendId);
        }

        // And they become your follower (if not already)
        if (!senderUser.followers.includes(loggedInUserId)) {
            senderUser.followers.push(loggedInUserId);
        }

        await loggedInUser.save();
        await senderUser.save();

        return responseHandler(res, 200, "Friend request accepted successfully");

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const getAllFriends = async (req, res) => {
    try {
        const {userId} = req.params;

        const loggedInUser = await userModal
            .findById(userId)
            .select("followings followers");

        if (!loggedInUser) {
            return responseHandler(res, 404, "User not found");
        }

        // Get mutuals — those who are both followers and followings
        const mutualFriendsIds = loggedInUser.followings.filter(id =>
            loggedInUser.followers.includes(id)
        );

        const friends = await userModal.find({
            _id: { $in: mutualFriendsIds },
        }).select("name avatar email updatedAt");

        return responseHandler(res, 200, "Friends fetched successfully", friends);
    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};




export { sendfriendRequest, deleteFriendRequest, getAllFriendRequest, acceptFriendRequest, getAllFriends }