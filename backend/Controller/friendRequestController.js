import friendRequestModal from "../Models/friendrequestmodel.js";
import responseHandler from "../utils/responseHandler.js";

const sendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const friendId = req.params.friendId;
        const existingRequest = await friendRequestModal.findOne({
            $or: [
                { sender: userId, receiver: friendId },
                { sender: friendId, receiver: userId }
            ]
        });
        if (existingRequest) {
            return responseHandler(res, 400, "Friend Request Already Sent");
        }

        if (userId === friendId) {
            return responseHandler(res, 400, "You cannot send a friend request to yourself");
        }

        const friendRequest = await friendRequestModal.create({
            sender: userId,
            receiver: friendId,
            status: "pending"
        });
        return responseHandler(res, 200, "Friend Request Sent", friendRequest);
    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const friendId = req.params.friendId;
        const friendRequest = await friendRequestModal.findOne({
            $or: [
                { sender: userId, receiver: friendId },
                { sender: friendId, receiver: userId }
            ]
        });
        if (!friendRequest) {
            return responseHandler(res, 400, "Friend Request Not Found");
        }
        if (friendRequest.status!== "pending") {
            return responseHandler(res, 400, "Friend Request Already Accepted");
        }
        friendRequest.status = "accepted";
        await friendRequest.save();
        return responseHandler(res, 200, "Friend Request Accepted");

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
}

const cancelFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const friendId = req.params.friendId;
        const friendRequest = await friendRequestModal.findOne({
            $or: [
                { sender: userId, receiver: friendId },
                { sender: friendId, receiver: userId }
            ]
        });
        if (!friendRequest) {
            return responseHandler(res, 400, "Friend Request Not Found");
        }
        if (friendRequest.status !== "pending") {
            return responseHandler(res, 400, "Friend Request Already Accepted");
        }
        await friendRequestModal.findByIdAndDelete(friendRequest._id);
        return responseHandler(res, 200, "Friend Request Cancelled");
    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

export {
    sendRequest,
    cancelFriendRequest
};