const multer = require("multer");
const config = require('@config/config');

let storageOptions = {};

// Set destination if autosave is enabled
if (config.UPLOADS.AUTOSAVE) {
    storageOptions.destination = (req, file, cb) => {
        cb(null, config.PATHS.PUBLIC);
    };
}

// Set filename if auto rename is enabled
storageOptions.filename = (req, file, cb) => {  
    let uniqueName = config.UPLOADS.UNIQUE_UPLOAD_NAME || '';

    if (config.UPLOADS.AUTORENAME) { 
        uniqueName = uniqueName || Date.now();
        uniqueName += "-" + file.originalname.replace(/\s+/g, '_'); 
    } else if (uniqueName) { 
        uniqueName += "-" + Date.now();
        uniqueName += "-" + file.originalname.replace(/\s+/g, '_'); 
    } else {
        uniqueName = file.originalname;
    }
    
    cb(null, uniqueName);
};


// Only use storage if options exist
const storage = Object.keys(storageOptions).length > 0 ? multer.diskStorage(storageOptions) : undefined;

// filter files in respect to allowed types.
const allowed_file_types = (req, file, cb) => {
    const allowedTypes = config.UPLOADS.ALLOWED_FILE_TYPES;
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

// Upload limits
const upload_limits = {
    fileSize: config.UPLOADS.MAX_FILE_SIZE,
    files: config.UPLOADS.MAX_UPLOADS
};

// Preserve path setting
const preservePath = config.UPLOADS.PRESERVE_PATH;

// set the multer options in respect to availability 
// and config settings
const uploadOptions = { 
    storage: storage, 
    fileFilter: allowed_file_types, 
    limits: upload_limits, 
    preservePath: preservePath 
};

if (!storage) delete uploadOptions.storage;
const upload = multer(uploadOptions);

module.exports = { upload };
