import Transcript from '../models/Transcript.js';
import { transcribeAudio } from '../services/transcriptionService.js';

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    const audioFilePath = req.file.path;

    const transcriptText = await transcribeAudio(audioFilePath);

    // Save transcript to DB
    const transcript = new Transcript({
      filename: req.file.originalname,
      transcript: transcriptText
    });
    await transcript.save();

    res.json({ transcript: transcriptText });
  } catch (err) {
    console.error(err);
    res.status(500).send('Transcription error');
  }
};
