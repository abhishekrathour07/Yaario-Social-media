import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDANARY_CLOUD_NAME,
    api_key: process.env.CLOUDANARY_APIKEY,
    api_secret: process.env.CLOUDANARY_SECRETS
});

const storage = multer.memoryStorage();
const multerMiddleware = multer({ storage });

const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const resourceType = file.mimetype.startsWith("video") ? "video" : "image";

        const stream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        const readableStream = Readable.from(file.buffer);
        readableStream.pipe(stream);
    });
};

export { multerMiddleware, uploadFileToCloudinary };
