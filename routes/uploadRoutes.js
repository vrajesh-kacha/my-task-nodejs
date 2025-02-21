import express from 'express';
import { uploadFile } from '../controller/uploadController.js';


const router = express.Router();

router.post("/upload",uploadFile);
export default router;