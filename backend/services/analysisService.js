import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyzeTranscript = async (transcriptText) => {
  const prompt = `
You are an AI call quality coach. Given the transcript of a customer service call, do the following:

1. Rate the call (scale 1–5) on:
   - Call Opening
   - Capturing Customer Issue
   - Agent Sentiment
   - Customer Sentiment
   - CSAT or FCR (inferred)
   - Resolution Quality

2. Write a short feedback summary (coaching advice).

3. Recommend 1–2 learning resources (title + URL) for the agent to review.

4. Generate a short 2-question multiple choice quiz to reinforce good call handling practices.

5. Define clear completion criteria for the coaching session.

Use the following JSON structure **only**:

{
  "scores": {
    "callOpening": 4,
    "issueCapture": 5,
    "agentSentiment": "Positive",
    "customerSentiment": "Neutral",
    "csatFcr": 4,
    "resolutionQuality": 5
  },
  "coachingSummary": "The agent was helpful and handled the issue well. Empathy in the opening greeting could improve.",
  "resources": [
    {
      "title": "How to Start Calls with Empathy",
      "url": "https://youtu.be/example1"
    },
    {
      "title": "Resolving Customer Issues Effectively",
      "url": "https://youtu.be/example2"
    }
  ],
  "quiz": [
    {
      "question": "What's the best way to start a support call?",
      "options": ["Greet and introduce yourself", "Ask for complaint", "Say nothing"],
      "answer": "Greet and introduce yourself"
    },
    {
      "question": "Why is understanding the issue important?",
      "options": ["To end the call fast", "To resolve correctly", "To avoid empathy"],
      "answer": "To resolve correctly"
    }
  ],
  "completionCriteria": "Watch the recommended videos and pass the quiz with 100% score."
}

Here is the transcript:
"""
${transcriptText}
"""
`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    // model: "gpt-3.5-turbo", // fallback if needed
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  const responseText = chatCompletion.choices[0].message.content;

  const firstBrace = responseText.indexOf("{");
  const lastBrace = responseText.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No valid JSON found in LLM response.");
  }

  const jsonBlock = responseText.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonBlock);
  } catch (err) {
    console.error("GPT raw output:\n", responseText);
    console.error("Extracted JSON block:\n", jsonBlock);
    throw new Error("Failed to parse GPT output.");
  }
};
