import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multiFileUploader = (folderName, allowedFormats, maxFileSize, maxFileCount, errorMessage) => {
    const UPLOAD_FOLDER = path.join(__dirname, "..", "public/uploads", folderName);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname.toLowerCase().split(" ").join("-")}`;
            cb(null, fileName);
        }
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: maxFileSize,
            files: maxFileCount, // restrict number of files
        },
        fileFilter: (req, file, cb) => {
            if (allowedFormats.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        }
    });

    // return middleware that accepts multiple files (same field name)
    return upload.array("files", maxFileCount);
};

export default multiFileUploader;
