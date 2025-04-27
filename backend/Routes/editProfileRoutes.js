import express from 'express';
import { editCoverImage, editProfilePic } from '../Controller/editProfileController.js';
import { multerMiddleware } from '../config/cloudinary.js';
const editProfileRouter = express.Router();

editProfileRouter.put('/profile-pic/edit',multerMiddleware.single("avatar"), editProfilePic);
editProfileRouter.put('/cover-pic/edit',multerMiddleware.single("coverImage"), editCoverImage);

export default editProfileRouter;