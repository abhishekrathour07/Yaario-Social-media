import notificationModal from "../Models/NotificationModal.js";
import responseHandler from "../utils/responseHandler.js";

const getNotificationsByUser = async (req, res) => {
    try {
        const userId = req.user._id; 

        const notifications = await notificationModal.find({ receiver: userId })
            .populate('sender', 'name avatar')
            .populate('post', 'caption')
            .sort({ createdAt: -1 });

        console.log("Notifications:", notifications);

        return responseHandler(res, 200, "Notification fetched successfully", notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};


export { getNotificationsByUser }