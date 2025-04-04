import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    caption: { type: String, required: true },
    postImageUrl: { type: String, },
    mediaType: { type: String, enum: ["image", "video"] },
    like: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    share: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    comment: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commentText: { type: String, required: true },
        timestamps: { type: Date, defaukt: Date.now }
    }],
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 }
},
    {
        timestamps: true,
        getters: true
    })

const postModal = mongoose.model("Post", postSchema);
export default postModal;
