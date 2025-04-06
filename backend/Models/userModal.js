import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    avatar: { type: String, default: null },
    coverImage: { type: String, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
    {
        timestamps: true,
        toJSON: { getters: true }
    })

const userModal = mongoose.model("User", userSchema);
export default userModal 