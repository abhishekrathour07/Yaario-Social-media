import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    isSaved: {
        type: Boolean,
        default: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

const savedPostModel = mongoose.model("SavedPost", savedPostSchema);
export default savedPostModel;
