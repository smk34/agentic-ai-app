import { Router } from 'express';
import upload from '../middleware/multerConfig.js';
import { handleUpload } from '../controllers/uploadController.js';

const router = Router();

// Handles POST to /api/upload with field name 'audio'
router.post('/', upload.single('audio'), handleUpload);

export default router;
