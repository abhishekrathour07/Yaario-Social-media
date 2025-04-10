import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    bio: { type: mongoose.Schema.Types.ObjectId, ref: "Bio" },
    avatar: { type: String, default: null },
    coverImage: { type: String, default: 'https://asset.cloudinary.com/dkndihxkb/2e9164f778700707d91580f649520c0c' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
    {
        timestamps: true,
        toJSON: { getters: true }
    })

const userModal = mongoose.model("User", userSchema);
export default userModal 