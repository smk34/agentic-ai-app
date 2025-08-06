// import mongoose from 'mongoose';

// const transcriptSchema = new mongoose.Schema({
//   filename: String,
//   filepath: String,
//   transcript: String,
//   uploadedAt: { type: Date, default: Date.now },
//   scores: {
//     callOpening: Number,
//     issueCapture: Number,
//     agentSentiment: String,
//     customerSentiment: String,
//     csatFcr: Number,
//     resolutionQuality: Number,
//     feedbackSummary: String
//   }
// });

// export default mongoose.model('Transcript', transcriptSchema);

import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  transcript: String,
  uploadedAt: { type: Date, default: Date.now },
  scores: {
    callOpening: Number,
    issueCapture: Number,
    agentSentiment: String,
    customerSentiment: String,
    csatFcr: Number,
    resolutionQuality: Number,
  },
  coaching: {
    summary: String,
    resources: [
      {
        title: String,
        url: String,
      },
    ],
    quiz: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
    completionCriteria: String,
  },
});

export default mongoose.model("Transcript", transcriptSchema);
