const express = require('express');
const router = express.Router();
const multer = require('multer');

const app = express();
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/storage');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
const upload = multer({ storage: fileStorage });

const uploadController = require('../controllers/uploadHandler');

router.post('/', upload.single('file'), uploadController.uploadImage);

module.exports = router;