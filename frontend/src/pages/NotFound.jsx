import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-zinc-400 mb-6">The page you're looking for doesn't exist.</p>
      <NavLink
        to="/"
        className="bg-zinc-100 text-black px-4 py-2 rounded-md font-medium hover:bg-zinc-200 transition"
      >
        Go Home
      </NavLink>
    </div>
  );
};

export default NotFound;
