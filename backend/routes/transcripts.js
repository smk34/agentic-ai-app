import { Router } from "express";
import { getAllTranscripts } from "../controllers/transcriptController.js";

const router = Router();

router.get("/transcripts", getAllTranscripts);

export default router;
