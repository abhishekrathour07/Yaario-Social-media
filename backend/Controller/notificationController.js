import notificationModal from "../Models/NotificationModal.js";
import responseHandler from "../utils/responseHandler.js";

const getNotificationsByUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const notifications = await notificationModal.find({ receiver: loggedInUserId })
            .populate('sender', 'name avatar')
            .populate('post', 'caption')
            .sort({ createdAt: -1 });

        console.log("Notifications:", notifications);

        return responseHandler(res, 200, "Notification fetched successfully", notifications);
    } catch (error) {
        responseHandler(res, 500, "internal server error", error)
    }
};

const markAllasRead = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log(loggedInUserId)

        const updated = await notificationModal.updateMany(
            { receiver: loggedInUserId, isRead: false },
            { $set: { isRead: true } }
        );

        return responseHandler(res, 200, "Notifications marked as read", updated);
    } catch (error) {
        return responseHandler(res, 500, "Internal server error", error);
    }
};


 const markSingleRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        return responseHandler(res, 200, "Notification marked as read",)

    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};

export { getNotificationsByUser, markAllasRead ,markSingleRead }