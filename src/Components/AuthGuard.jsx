import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom"; // Added Outlet
import { TokenContext } from "../ContextProvider/TokenContext";

const TOKEN_KEY = "token";

const AuthGuard = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const { logout } = useContext(TokenContext);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setShowPrompt(true);
    } else {
      // If a token exists, make sure we aren't showing the prompt
      setShowPrompt(false);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    setRedirect(true);
  };

  // 1. Handle explicit redirection
  if (redirect) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  // 2. Handle missing token / Session expired UI
  if (showPrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative w-96 p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg text-white text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-300">
            Session Expired
          </h2>
          <p className="mb-6 text-white/80">
            Your session has expired. Please log in again to continue.
          </p>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-md shadow transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children ? children : <Outlet />;
};

export default AuthGuard;
