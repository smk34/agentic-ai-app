import Transcript from "../models/Transcript.js";
import { transcribeAudio } from "../services/transcriptionService.js";
import { analyzeTranscript } from "../services/analysisService.js";

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const audioFilePath = req.file.path;

    // Step 1: Transcribe using Whisper CLI
    const transcriptText = await transcribeAudio(audioFilePath);

    // Step 2: Analyze using GPT
    const analysis = await analyzeTranscript(transcriptText);

    // Step 3: Store in MongoDB
    const transcriptDoc = new Transcript({
      filename: req.file.originalname,
      filepath: audioFilePath,
      transcript: transcriptText,
      scores: analysis.scores,
      coaching: {
        summary: analysis.coachingSummary,
        resources: analysis.resources,
        quiz: analysis.quiz,
        completionCriteria: analysis.completionCriteria,
      },
    });

    await transcriptDoc.save();

    // Step 4: Respond
    res.status(200).json({
      message: "Transcription and coaching analysis completed.",
      id: transcriptDoc._id,
      transcript: transcriptText,
      scores: analysis.scores,
      coaching: transcriptDoc.coaching,
    });
  } catch (error) {
    console.error("Upload processing failed:", error);
    res.status(500).json({ error: "Transcription or analysis failed." });
  }
};
