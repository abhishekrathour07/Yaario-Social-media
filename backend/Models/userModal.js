import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: { type: String },
},
    {
        timestamps: true,
        getters: true
    })

const userModal = mongoose.model("User", userSchema);
export default userModal 