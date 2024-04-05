import multer from "multer";

// Define storage settings
const storage = multer.diskStorage({
    destination: "../temp/",
    filename: function (req, file, cb) {
        // Use original filename for videos or define your custom naming logic
        cb(null, file.originalname);
    }
});

// Create multer instance with storage configuration and size limits
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB (in bytes)
    }
});

export default upload;

