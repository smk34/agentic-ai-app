import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append('audio', audioFile);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscript(response.data.transcript);
    } catch (err) {
      console.error('Upload error:', err);
      setTranscript('Failed to transcribe audio');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Audio File</h2>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudioFile(e.target.files[0])}
        disabled={loading}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!audioFile || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Uploading...' : 'Upload & Transcribe'}
      </button>
      {transcript && (
        <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap">{transcript}</div>
      )}
    </div>
  );
};

export default FileUpload;
