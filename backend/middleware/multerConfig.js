// middleware/multerConfig.js
import multer from 'multer';
// import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Save with original filename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
