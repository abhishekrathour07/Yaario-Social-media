// controllers/storyController.js
import { uploadFileToCloudinary } from "../config/cloudinary.js";
import storyModel from "../Models/storyModel.js";
import responseHandler from "../utils/responseHandler.js";


const createStory = async (req, res) => {
    try {
        const userId = req.user._id;
        let { storyImage } = req.body;

        let mediaUrl = null;
        let mediaType = null;

        if (storyImage) {
            const uploadToCloudinary = await uploadFileToCloudinary(storyImage);
            mediaUrl = uploadToCloudinary?.secure_url;
            mediaType = postImageUrl.mimetype.startsWith("video") ? "video" : "image";
        }

        const newMedia = {
            mediaUrl,
            mediaType,
        };

        let userStory = await storyModel.findOne({ userId });

        if (userStory) {
            userStory.media.push(newMedia);
            await userStory.save();
        } else {
            userStory = new storyModel({ userId, media: [newMedia] });
            await userStory.save();
        }

        return responseHandler(res, 201, "Story added successfully", userStory);
    } catch (error) {
        console.error("Story creation error:", error);
        return responseHandler(res, 500, "Error creating story", error);
    }
};



const getStories = async (req, res) => {
    try {
        const stories = await storyModel.find().populate("userId", "name avatar");
        return responseHandler(res, 200, "Stories fetched", stories);
    } catch (error) {
        return responseHandler(res, 500, "Failed to fetch stories", error);
    }
};

const deleteStory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { storyId } = req.params;

        const story = await storyModel.findOne({ _id: storyId, userId });

        if (!story) {
            return responseHandler(res, 404, "Story not found or unauthorized");
        }

        await storyModel.findByIdAndDelete(storyId);

        return responseHandler(res, 200, "Story deleted");
    } catch (error) {
        return responseHandler(res, 500, "Failed to delete story", error);
    }
};

export { getStories, deleteStory, createStory }
