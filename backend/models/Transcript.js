import mongoose from 'mongoose';

const transcriptSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  transcript: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

export default Transcript;
