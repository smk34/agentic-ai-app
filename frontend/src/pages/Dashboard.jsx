import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCoaching, setExpandedCoaching] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const apiBase = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await axios.get(`${apiBase}/api/transcripts`);
        setTranscripts(response.data);
      } catch (err) {
        console.error("Error fetching transcripts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTranscripts();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 8) return "bg-green-900/20 border-green-800";
    if (score >= 6) return "bg-yellow-900/20 border-yellow-800";
    return "bg-red-900/20 border-red-800";
  };

  const toggleCoaching = (itemId) => {
    setExpandedCoaching((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleQuizAnswer = (itemId, questionId, answer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [questionId]: answer,
      },
    }));
  };

  const submitQuiz = (itemId, quiz) => {
    const answers = quizAnswers[itemId] || {};
    let correct = 0;
    const total = quiz.length;

    quiz.forEach((question) => {
      if (answers[question._id] === question.answer) {
        correct++;
      }
    });

    const score = Math.round((correct / total) * 100);
    setQuizResults((prev) => ({
      ...prev,
      [itemId]: {
        score,
        correct,
        total,
        passed: score === 100,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/20"></div>

      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                // Clear any stored authentication data
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Redirect to login page or home
                navigate("/login");
              }}
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
          <p className="text-zinc-400 text-lg">
            Manage and analyze your contact center transcriptions
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload New Audio
              </h2>
              <p className="text-zinc-400">
                Upload and transcribe your contact center audio files
              </p>
            </div>
            <FileUpload />
          </div>
        </div>

        {/* Transcripts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-white">
                Uploaded Calls
              </h2>
            </div>
            {!loading && transcripts.length > 0 && (
              <div className="text-sm text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
                {transcripts.length}{" "}
                {transcripts.length === 1 ? "call" : "calls"}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className="text-zinc-400 text-lg">Loading transcripts...</p>
              </div>
            </div>
          ) : transcripts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                No transcripts yet
              </h3>
              <p className="text-zinc-500 max-w-md mx-auto">
                Upload your first audio file to get started with transcription
                and analysis.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {transcripts.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-zinc-900/70 backdrop-blur-sm rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all duration-300 overflow-hidden group"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {item.filename}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-zinc-400">
                          <div className="flex items-center space-x-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>
                              Uploaded:{" "}
                              {new Date(item.uploadedAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Transcript */}
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Transcript
                      </h4>
                      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                        <div className="overflow-auto text-sm text-zinc-300 whitespace-pre-wrap max-h-60 leading-relaxed">
                          {item.transcript || "Transcript not available"}
                        </div>
                      </div>
                    </div>

                    {/* Analysis Scores */}
                    {item.scores ? (
                      <div>
                        <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          Performance Analysis
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {[
                            {
                              label: "Call Opening",
                              value: item.scores.callOpening,
                            },
                            {
                              label: "Issue Capture",
                              value: item.scores.issueCapture,
                            },
                            {
                              label: "Agent Sentiment",
                              value: item.scores.agentSentiment,
                              isText: true,
                            },
                            {
                              label: "Customer Sentiment",
                              value: item.scores.customerSentiment,
                              isText: true,
                            },
                            { label: "CSAT/FCR", value: item.scores.csatFcr },
                            {
                              label: "Resolution Quality",
                              value: item.scores.resolutionQuality,
                            },
                          ].map((score, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-lg border ${
                                score.isText
                                  ? "bg-zinc-800/30 border-zinc-700"
                                  : getScoreBgColor(score.value)
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-300">
                                  {score.label}
                                </span>
                                {score.isText ? (
                                  <span className="text-sm font-medium text-zinc-300">
                                    {score.value}
                                  </span>
                                ) : (
                                  <span
                                    className={`text-lg font-bold ${getScoreColor(
                                      score.value
                                    )}`}
                                  >
                                    {score.value}/10
                                  </span>
                                )}
                              </div>
                              {!score.isText && (
                                <div className="mt-2 w-full bg-zinc-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      score.value >= 8
                                        ? "bg-green-500"
                                        : score.value >= 6
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${(score.value / 10) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-zinc-800/30 rounded-lg p-6 border border-zinc-700 text-center">
                        <svg
                          className="w-12 h-12 text-zinc-500 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <p className="text-zinc-500 italic">
                          Analysis data not available for this transcript.
                        </p>
                      </div>
                    )}

                    {/* Coaching Section */}
                    {item.coaching &&
                      (item.coaching.summary ||
                        item.coaching.resources?.length > 0 ||
                        item.coaching.quiz?.length > 0) && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-white flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-orange-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                              </svg>
                              AI Coaching & Development
                            </h4>
                            <button
                              onClick={() => toggleCoaching(item._id)}
                              className="cursor-pointer flex items-center space-x-2 px-3 py-1 bg-orange-900/20 border border-orange-800 rounded-lg hover:bg-orange-900/30 transition-colors text-sm text-orange-300"
                            >
                              <span>
                                {expandedCoaching[item._id] ? "Hide" : "Show"}{" "}
                                Details
                              </span>
                              <svg
                                className={`w-4 h-4 transition-transform ${
                                  expandedCoaching[item._id] ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Coaching Summary */}
                          {item.coaching.summary && (
                            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg p-4 border border-orange-800/30 mb-4">
                              <h5 className="text-sm font-semibold text-orange-300 mb-2 flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                  />
                                </svg>
                                Coaching Summary
                              </h5>
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                {item.coaching.summary}
                              </p>
                            </div>
                          )}

                          {expandedCoaching[item._id] && (
                            <div className="space-y-6">
                              {/* Learning Resources */}
                              {item.coaching.resources &&
                                item.coaching.resources.length > 0 && (
                                  <div>
                                    <h5 className="text-md font-semibold text-white mb-3 flex items-center">
                                      <svg
                                        className="w-4 h-4 mr-2 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                      </svg>
                                      Recommended Learning Resources
                                    </h5>
                                    <div className="grid gap-3">
                                      {item.coaching.resources.map(
                                        (resource, idx) => (
                                          <div
                                            key={idx}
                                            className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors"
                                          >
                                            <div className="flex items-center justify-between">
                                              <div className="flex-1">
                                                <h6 className="text-sm font-medium text-white mb-1">
                                                  {resource.title}
                                                </h6>
                                                <p className="text-xs text-zinc-400">
                                                  {resource.url}
                                                </p>
                                              </div>
                                              <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                                              >
                                                <svg
                                                  className="w-3 h-3"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                  />
                                                </svg>
                                                <span>Watch</span>
                                              </a>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {/* Quiz Section */}
                              {item.coaching.quiz &&
                                item.coaching.quiz.length > 0 && (
                                  <div>
                                    <h5 className="text-md font-semibold text-white mb-3 flex items-center">
                                      <svg
                                        className="w-4 h-4 mr-2 text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      Knowledge Check Quiz
                                    </h5>
                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700 space-y-4">
                                      {item.coaching.quiz.map(
                                        (question, qIdx) => (
                                          <div
                                            key={question._id}
                                            className="space-y-3"
                                          >
                                            <h6 className="text-sm font-medium text-white">
                                              {qIdx + 1}. {question.question}
                                            </h6>
                                            <div className="space-y-2">
                                              {question.options.map(
                                                (option, oIdx) => (
                                                  <label
                                                    key={oIdx}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                  >
                                                    <input
                                                      type="radio"
                                                      name={`quiz-${item._id}-${question._id}`}
                                                      value={option}
                                                      onChange={(e) =>
                                                        handleQuizAnswer(
                                                          item._id,
                                                          question._id,
                                                          e.target.value
                                                        )
                                                      }
                                                      className="text-purple-500 focus:ring-purple-500"
                                                      disabled={
                                                        quizResults[item._id]
                                                      }
                                                    />
                                                    <span className="text-sm text-zinc-300">
                                                      {option}
                                                    </span>
                                                  </label>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}

                                      {!quizResults[item._id] ? (
                                        <button
                                          onClick={() =>
                                            submitQuiz(
                                              item._id,
                                              item.coaching.quiz
                                            )
                                          }
                                          className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                        >
                                          Submit Quiz
                                        </button>
                                      ) : (
                                        <div
                                          className={`mt-4 p-3 rounded-lg border ${
                                            quizResults[item._id].passed
                                              ? "bg-green-900/20 border-green-800"
                                              : "bg-red-900/20 border-red-800"
                                          }`}
                                        >
                                          <div className="flex items-center space-x-2">
                                            {quizResults[item._id].passed ? (
                                              <svg
                                                className="w-5 h-5 text-green-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            ) : (
                                              <svg
                                                className="w-5 h-5 text-red-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            )}
                                            <span
                                              className={`font-medium ${
                                                quizResults[item._id].passed
                                                  ? "text-green-300"
                                                  : "text-red-300"
                                              }`}
                                            >
                                              Quiz{" "}
                                              {quizResults[item._id].passed
                                                ? "Passed"
                                                : "Failed"}
                                              : {quizResults[item._id].score}% (
                                              {quizResults[item._id].correct}/
                                              {quizResults[item._id].total})
                                            </span>
                                          </div>
                                          {item.coaching.completionCriteria && (
                                            <p className="text-xs text-zinc-400 mt-2">
                                              <strong>
                                                Completion Criteria:
                                              </strong>{" "}
                                              {item.coaching.completionCriteria}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/20 rounded-full"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500/30 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/25 rounded-full"></div>
    </div>
  );
};

export default Dashboard;
