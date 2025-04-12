import userModal from "../models/userModal.js"
import responseHandler from "../utils/responseHandler.js"


const getLoginUserDetail = async (req, res) => {
    try {
        const userId = req.user._id;
        const allUsers = await userModal.findById(userId).select("id name avatar email coverImage followers followings");
        return responseHandler(res, 200, "Data fetched Successfully", allUsers);
    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }
};

const getProfileDetail = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModal.findById(userId).select("id name avatar coverImage followers followings");
      return responseHandler(res, 200, "User data fetched successfully", user);
    } catch (error) {
      console.log(error);
      return responseHandler(res, 500, "Internal Server Error");
    }
  };
  



const friendSuggestion = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const loggedInUser = await userModal.findById(loggedInUserId).select("followings followers");
        if (!loggedInUser) {
            return responseHandler(res, 404, "user data not found please check the userId");
        }

        const userToShowSuggestion = await userModal.find({
            _id: {
                $ne: loggedInUserId,
                $nin: [...loggedInUser.followers, ...loggedInUser.followings]
            }
        }).select("avatar name email")

        return responseHandler(res, 200, "Data fetched for suggestion", userToShowSuggestion)

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal Server Error");
    }

}
export { getLoginUserDetail, friendSuggestion, getProfileDetail }