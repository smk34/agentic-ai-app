// import Transcript from '../models/Transcript.js';
// import { transcribeAudio } from '../services/transcriptionService.js';

// export const handleUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }
//     const audioFilePath = req.file.path;

//     const transcriptText = await transcribeAudio(audioFilePath);

//     // Save transcript to DB
//     const transcript = new Transcript({
//       filename: req.file.originalname,
//       transcript: transcriptText
//     });
//     await transcript.save();

//     res.json({ transcript: transcriptText });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Transcription error');
//   }
// };


import Transcript from '../models/Transcript.js';
import { transcribeAudio } from '../services/transcriptionService.js';

export const handleUpload = async (req, res) => {
  try {
    // Validate if file is provided
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const audioFilePath = req.file.path;

    // Transcribe the uploaded audio
    const transcriptText = await transcribeAudio(audioFilePath);

    // Create and store transcript document in MongoDB
    const transcriptDoc = new Transcript({
      filename: req.file.originalname,
      filepath: audioFilePath,
      transcript: transcriptText,
      uploadedAt: new Date()
    });

    await transcriptDoc.save();

    res.status(200).json({
      message: 'Transcription completed',
      transcript: transcriptText,
      id: transcriptDoc._id
    });
  } catch (error) {
    console.error('Transcription failed:', error);
    res.status(500).json({ error: 'Transcription failed. Please try again later.' });
  }
};

