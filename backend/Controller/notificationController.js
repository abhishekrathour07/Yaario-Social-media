import notificationModal from "../Models/NotificationModal.js";
import responseHandler from "../utils/responseHandler.js";

const getNotificationsByUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const notifications = await notificationModal.find({ receiver: loggedInUserId })
            .populate('sender', 'name avatar')
            .populate('post', 'caption')
            .sort({ createdAt: -1 });

        return responseHandler(res, 200, "Notification fetched successfully", notifications);
    } catch (error) {
        responseHandler(res, 500, "internal server error", error)
    }
};
const getNotificationsById = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notifications = await notificationModal.findById(notificationId)
            .populate('post')
            .sort({ createdAt: -1 });

        return responseHandler(res, 200, "Notification fetched successfully", notifications);
    } catch (error) {
        responseHandler(res, 500, "internal server error", error)
    }
};

const markAllasRead = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
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
        const notification = await notificationModal.findById(notificationId);

        if (!notification) {
            return responseHandler(res,404, "Notification not found");
        }
        if(notification.isRead){
            return responseHandler(res,400, "Notification already read");

        }
        notification.isRead = true;
        await notification.save();

        return responseHandler(res, 200, "Notification marked as read");

    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};



export { getNotificationsByUser, markAllasRead, markSingleRead, getNotificationsById }