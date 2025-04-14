import mongoose from "mongoose"

const storySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    media: [
        {
            mediaUrl: { type: String, required: true },
            mediaType: { type: String, enum: ["image", "video"], required: true },
            createdAt: { type: Date, default: Date.now, expires: 86400 },
        },
    ],

})

const storyModel = mongoose.model("story", storySchema)
export default storyModel;
