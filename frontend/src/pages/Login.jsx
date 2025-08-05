// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         username,
//         password,
//       });

//       const { token, user } = response.data;

//       // Store token and user in localStorage or context
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       setIsLoading(true);

//       // Redirect to dashboard or main page
//       navigate("/dashboard");
//     } catch (err) {
//       setIsLoading(false);
//       setError("Invalid username or password", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-sm bg-zinc-900 rounded-xl p-8 shadow-lg text-white">
//         <h2 className="text-xl font-semibold mb-1">Login to your account</h2>
//         <p className="text-sm text-zinc-400 mb-6">
//           Enter your email below to login to your account
//         </p>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1 text-zinc-300">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm text-white placeholder-zinc-500"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1 text-zinc-300">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm text-white placeholder-zinc-500"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 bg-zinc-100 text-black font-medium rounded-md hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Use AuthContext to log in
      login(token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm bg-zinc-900 rounded-xl p-8 shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-1">Login to your account</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Enter your email below to login to your account
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm text-white placeholder-zinc-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm text-white placeholder-zinc-500"
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full py-2 bg-zinc-100 text-black font-medium rounded-md hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
