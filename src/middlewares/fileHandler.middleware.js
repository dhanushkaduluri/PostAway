import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/posts/');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        
        cb(null, name);
    },
});

export const uploadFile = multer({
    storage: storageConfig,
}).single('imageUrl'); // Assuming the field in your form is named 'pdfFile'
