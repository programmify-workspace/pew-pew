const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directories if they don't exist
const createUploadDirs = () => {
    const baseDir = path.join(__dirname, '../public/uploads');
    const avatarDir = path.join(baseDir, 'avatars');
    
    // Create base uploads directory if it doesn't exist
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    
    // Create avatars subdirectory if it doesn't exist
    if (!fs.existsSync(avatarDir)) {
        fs.mkdirSync(avatarDir);
    }
};

// Call this function when the app starts
createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if the file is from avatar upload
        const isAvatar = file.fieldname === 'avatar';
        const uploadPath = path.join(
            __dirname,
            '../public/uploads',
            isAvatar ? 'avatars' : ''
        );
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Create unique filename: timestamp-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

module.exports = upload;