import express from "express"
import { deleteAccount, updatePassword, updatePrivacySettings } from "../Controller/settingController.js";

const settingRouter = express.Router();

settingRouter.put("/change-password", updatePassword);
settingRouter.delete("/delete-account", deleteAccount);
settingRouter.put("/private-account", updatePrivacySettings);

export default settingRouter
