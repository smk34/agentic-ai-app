import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to AI Call Audio Analyzing App
      </h1>
      <p className="text-zinc-400 mb-8 text-center max-w-md">
        Transcribe and score your customer calls using AI-powered analysis.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="cursor-pointer px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-zinc-100 transition"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
