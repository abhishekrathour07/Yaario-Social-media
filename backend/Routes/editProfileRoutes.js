import express from 'express';
import { editCoverImage, editProfilePic } from '../controller/editProfileController.js';
import multer from 'multer';
const editProfileRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
editProfileRouter.put('/profile-pic/edit',upload.single("avatar"), editProfilePic);
editProfileRouter.put('/cover-pic/edit',upload.single("coverImage"), editCoverImage);

export default editProfileRouter;