import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDANARY_CLOUD_NAME,
    api_key: process.env.CLOUDANARY_APIKEY,
    api_secret: process.env.CLOUDANARY_SECRETS
});

const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {  
        const options = {
            resource_type: file.mimetype.startsWith("video") ? "video" : "image"
        };

        cloudinary.uploader.upload_large(file.path, options, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

//  Multer middleware for file uploads (temporary storage in "uploads/" folder)
const multerMiddleware = multer({ dest: "uploads/" });

export { multerMiddleware, uploadFileToCloudinary };