import bioModal from "../Models/BioModel.js";
import responseHandler from "../utils/responseHandler.js";

const getBioDetails = async (req, res) => {
    try {
        const {userId} = req.params;
        const bio = await bioModal.findOne({ user: userId });

        if (!bio) {
            return responseHandler(res, 404, "Bio not found");
        }
        return responseHandler(res, 200, "Bio data fetched successfully", bio);

    } catch (error) {
        console.log(error);
        responseHandler(res, 500, "Internal Server Error");
    }
};

const updateBioDetails = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { work, education, location, relationshipStatus } = req.body;

        const updatedBio = await bioModal.findOneAndUpdate(
            { user: loggedInUserId },
            {
                user: loggedInUserId,
                work,
                education,
                location,
                relationshipStatus,
            },
            { upsert: true, new: true } // Agar bio document nahi mila toh create kar do.
        );

        return responseHandler(res, 200, "Bio updated successfully", updatedBio);
    } catch (error) {
        console.log(error);
        responseHandler(res, 500, "Internal Server Error");
    }
};


export { getBioDetails, updateBioDetails }
