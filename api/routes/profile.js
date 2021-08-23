const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({ storage: fileStorage });

const uploadController = require('../controllers/uploadHandler');

router.post('/:id', upload.single('file'), uploadController.changeAvatar);

module.exports = router;