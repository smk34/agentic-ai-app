import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";

const Dashboard = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/transcripts");
        setTranscripts(response.data);
      } catch (err) {
        console.error("Error fetching transcripts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTranscripts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      <div className="mb-8">
        <FileUpload />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Uploaded Calls</h2>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : transcripts.length === 0 ? (
        <p className="text-zinc-500">No transcripts available.</p>
      ) : (
        <div className="grid gap-6">
          {transcripts.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 rounded-lg p-4 border border-zinc-700"
            >
              <h3 className="text-lg font-semibold mb-1">{item.filename}</h3>
              <p className="text-sm text-zinc-400 mb-2">
                Uploaded: {new Date(item.uploadedAt).toLocaleString()}
              </p>

              <div className="overflow-auto text-sm text-zinc-300 whitespace-pre-wrap max-h-60 mb-3">
                {item.transcript || "Transcript not available"}
              </div>

              {item.scores ? (
                <div className="text-sm text-zinc-200 space-y-1">
                  <p>Call Opening: {item.scores.callOpening}</p>
                  <p>Issue Capture: {item.scores.issueCapture}</p>
                  <p>Agent Sentiment: {item.scores.agentSentiment}</p>
                  <p>Customer Sentiment: {item.scores.customerSentiment}</p>
                  <p>CSAT/FCR: {item.scores.csatFcr}</p>
                  <p>Resolution Quality: {item.scores.resolutionQuality}</p>
                  <p className="mt-2 italic text-zinc-300">
                    Feedback: {item.scores.feedbackSummary}
                  </p>
                </div>
              ) : (
                <p className="text-zinc-500 italic">No analysis data.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
