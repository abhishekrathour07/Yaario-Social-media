import userModal from '../models/userModal.js';
import responseHandler from '../utils/responseHandler.js';
import { uploadFileToCloudinary } from '../config/cloudinary.js'

const editProfilePic = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const avatar = req.file;
        let mediaUrl = null;

        if (avatar) {
            const uploadToCloudinary = await uploadFileToCloudinary(avatar);
            mediaUrl = uploadToCloudinary?.secure_url;
        }
        const loggedInUser = await userModal.findById(loggedInUserId)
        loggedInUser.avatar = mediaUrl
        loggedInUser.save()
        return responseHandler(res, 200, "Profile picture updated successfully", loggedInUser);
    } catch (error) {
        responseHandler(res, 500, "Internal Server Error")
    }
}
const editCoverImage = async (req, res) => {
   try {
    
    const loggedInUserId = req.user._id;
    const coverImage = req.file;
    let mediaUrl = null;

    if (coverImage) {
        const uploadToCloudinary = await uploadFileToCloudinary(coverImage);
        mediaUrl = uploadToCloudinary?.secure_url;
    }
    const loggedInUser = await userModal.findById(loggedInUserId)
    loggedInUser.coverImage = mediaUrl
    loggedInUser.save()
    return responseHandler(res, 200, "Profile picture updated successfully", loggedInUser);

   } catch (error) {
        responseHandler(res, 500, "Internal Server Error")
    
   }
}



export {
    editProfilePic, editCoverImage
}