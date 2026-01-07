// hooks/useApi.js
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../ContextProvider/TokenContext";
import apiCall from "../Utils/ApiCall/apiCall";
import { toast } from "react-toastify"; // Ensure react-toastify is imported

const useApi = () => {
  const { logout } = useContext(TokenContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/LoginList");
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        handleLogout();
      }, 3000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, [showPopup, handleLogout]);

  const callApi = async (method, url, data = {}, options = {}) => {
    try {
      // Pass the options object to the apiCall function
      const response = await apiCall(method, url, data, options);

      // Check for an 'Invalid Token' response from the API.
      // apiCall.js already handles mapping the 401 status to this message.
      if (response.error && response.message.includes("Invalid Token")) {
        setPopupMessage(
          "Your session has expired or is unauthorized. You will be logged out."
        );
        setShowPopup(true);
      }

      // Return the response object, regardless of success or error status.
      // This allows the calling component to handle specific errors (e.g., student not found).
      return response;
    } catch (error) {
      console.error("An unhandled error occurred in useApi:", error);
      toast.error("An unexpected error occurred. Please try again.");
      return { error: true, message: "An unexpected error occurred." };
    }
  };

  // Memoize handleLogout to prevent useEffect infinite loop
  // The useEffect dependency array `[showPopup, handleLogout]` is now correct.
  // It's a minor but good practice improvement.
  const memoizedHandleLogout = useCallback(handleLogout, [logout, navigate]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        memoizedHandleLogout();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, memoizedHandleLogout]);

  return { callApi, showPopup, popupMessage, setShowPopup };
};

export default useApi;
