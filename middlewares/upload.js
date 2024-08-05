const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Menyimpan file ke folder yang disesuaikan dalam request
        const uploadPath = req.body.uploadPath || 'uploads/';
        
        // Pastikan folder ada, jika tidak buat folder
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Menyusun nama file dengan timestamp untuk memastikan keunikan
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Filter file
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb('Error: Only images are allowed!');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
    fileFilter: fileFilter
});

module.exports = upload;
