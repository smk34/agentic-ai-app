import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const transcribeAudio = (filePath) => {
  return new Promise((resolve, reject) => {
    const outputDir = './transcripts';

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const absolutePath = path.resolve(filePath).replaceAll('\\', '/');
    const safeOutputDir = path.resolve(outputDir).replaceAll('\\', '/');

    const command = `whisper "${absolutePath}" --model medium --language en --output_format txt --output_dir "${safeOutputDir}"`;

    console.log(`Running command: ${command}`); // for debug

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(`Whisper CLI error: ${error.message}`);
      }

      if (stderr) {
        console.warn(`Whisper CLI warning: ${stderr}`);
      }

      // Build expected transcript file path
      const transcriptPath = path.join(
        safeOutputDir,
        `${path.basename(filePath, path.extname(filePath))}.txt`
      );

      try {
        const transcription = fs.readFileSync(transcriptPath, 'utf-8');
        resolve(transcription);
      } catch (readError) {
        reject(`Error reading transcript: ${readError.message}`);
      }
    });
  });
};
