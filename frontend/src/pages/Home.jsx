// import FileUpload from "../components/FileUpload"

// const Home = () => (
//   <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
//     {/* Background gradient effect */}
//     <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/20"></div>

//     {/* Content container */}
//     <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
//       {/* Header section */}
//       <div className="mb-12">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-full mb-6">
//           <svg className="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//             />
//           </svg>
//         </div>

//         <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
//           Contact Center
//           <span className="block bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
//             Audio Transcription
//           </span>
//         </h1>

//         <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
//           Transform your audio files into accurate transcriptions with our advanced AI-powered technology
//         </p>
//       </div>

//       {/* Upload section */}
//       <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 shadow-2xl">
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-white mb-2">Upload Your Audio File</h2>
//           <p className="text-zinc-400">Drag and drop your audio file or click to browse</p>
//         </div>

//         <FileUpload />

//         {/* Features list */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//           <div className="flex items-center justify-center space-x-2 text-zinc-300">
//             <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>High Accuracy</span>
//           </div>
//           <div className="flex items-center justify-center space-x-2 text-zinc-300">
//             <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>Fast Processing</span>
//           </div>
//           <div className="flex items-center justify-center space-x-2 text-zinc-300">
//             <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>Secure & Private</span>
//           </div>
//         </div>
//       </div>

//       {/* Footer info */}
//       <div className="mt-8 text-zinc-500 text-sm">
//         <p>Supported formats: MP3, WAV, M4A, FLAC • Max file size: 100MB</p>
//       </div>
//     </div>

//     {/* Decorative elements */}
//     <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-zinc-600 rounded-full opacity-20"></div>
//     <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-zinc-500 rounded-full opacity-30"></div>
//     <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-zinc-600 rounded-full opacity-25"></div>
//   </main>
// )

// export default Home



import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to CallIQ</h1>
      <p className="text-zinc-400 mb-8 text-center max-w-md">
        Transcribe and score your customer calls using AI-powered analysis.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-zinc-100 transition"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
