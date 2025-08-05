import { useState, useRef } from "react"
import axios from "axios"

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) setSelectedFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0])
      event.dataTransfer.clearData()
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setResult(null)

    const formData = new FormData()
    formData.append('audio', selectedFile)

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setResult(response.data)
    } catch (error) {
      console.error("Upload error:", error)
      setResult({ error: "Upload failed. Please try again." })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className="relative border-2 border-dashed border-zinc-600 rounded-md p-6 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileSelect}
          ref={fileInputRef}
        />

        {selectedFile ? (
          <p className="text-zinc-300">Selected File: {selectedFile.name}</p>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-zinc-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 8m0 0-4-4m4 4L24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-zinc-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-zinc-500">MP3, WAV, M4A, FLAC</p>
          </>
        )}
      </div>

      <button
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-all duration-200"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Display result or error */}
      {result && (
        <div className="mt-4 bg-zinc-800 text-white p-4 rounded-md text-sm max-h-96 overflow-auto">
          {result.error ? (
            <p className="text-red-400">{result.error}</p>
          ) : (
            <>
              <h4 className="font-semibold mb-2">Transcript:</h4>
              <pre className="whitespace-pre-wrap">{result.transcript}</pre>

              {result.scores && (
                <>
                  <h4 className="mt-4 font-semibold">Scores:</h4>
                  <ul className="list-disc pl-5">
                    <li>Call Opening: {result.scores.callOpening}</li>
                    <li>Issue Capture: {result.scores.issueCapture}</li>
                    <li>Agent Sentiment: {result.scores.agentSentiment}</li>
                    <li>Customer Sentiment: {result.scores.customerSentiment}</li>
                    <li>CSAT/FCR: {result.scores.csatFcr}</li>
                    <li>Resolution Quality: {result.scores.resolutionQuality}</li>
                  </ul>
                  <p className="mt-2 text-zinc-300 italic">
                    Feedback: {result.scores.feedbackSummary}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default FileUpload
