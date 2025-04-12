import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['like', 'comment', 'send request', 'message', 'save' ,'accept request'], required: true },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        message: { type: String }, // optional custom message

        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const notificationModal = mongoose.model('Notification', notificationSchema);
export default notificationModal
