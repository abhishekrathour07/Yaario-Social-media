import mongoose from "mongoose";

const BioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    work: { type: String, default: "Not Provided" },
    education: { type: String, default: "Not Provided" },
    location: { type: String, default: "Not Provided" },
    relationshipStatus: { type: String, enum: ["single", "married", "divorsed", "widow"], default: "single" }

})

const bioModal = mongoose.model("Bio", BioSchema)
export default bioModal;