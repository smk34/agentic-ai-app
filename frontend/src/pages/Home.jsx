import FileUpload from '../components/FileUpload';

const Home = () => (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <h1 className="text-4xl font-extrabold mb-8">Contact Center Audio Transcription</h1>
    <FileUpload />
  </main>
);

export default Home;
