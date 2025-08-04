import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const transcribeAudio = (filePath) => {
  return new Promise((resolve, reject) => {
    // Command to run Whisper transcription on the audio file
    const command = `whisper "${filePath}" --model medium --language en --output_format txt --output_dir ./transcripts`;

    exec(command, (err) => {
      if (err) {
        return reject(err);
      }

      // Construct the path of the generated transcript file
      const transcriptPath = path.join(
        './transcripts',
        `${path.basename(filePath, path.extname(filePath))}.txt`
      );

      try {
        // Read the transcript text
        const transcription = fs.readFileSync(transcriptPath, 'utf-8');
        resolve(transcription);
      } catch (readError) {
        reject(readError);
      }
    });
  });
};
