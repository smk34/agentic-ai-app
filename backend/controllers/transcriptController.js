import Transcript from "../models/Transcript.js";

export const getAllTranscripts = async (req, res) => {
  try {
    const transcripts = await Transcript.find().sort({ uploadedAt: -1 });
    res.json(transcripts);
  } catch (err) {
    console.error("Error fetching transcripts:", err);
    res.status(500).json({ error: "Failed to fetch transcripts" });
  }
};
