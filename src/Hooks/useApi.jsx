// hooks/useApi.js
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../ContextProvider/TokenContext";
import apiCall from "../Utils/ApiCall/apiCall";

const useApi = () => {
  const { logout } = useContext(TokenContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        handleLogout();
      }, 3000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Updated to accept an options object
  const callApi = async (method, url, data = {}, options = {}) => {
    try {
      // Pass the options object to the apiCall function
      const response = await apiCall(method, url, data, options);

      if (response.error) {
        if (response.message.includes("Invalid Token")) {
          setPopupMessage(
            "Your session has expired or is unauthorized. You will be logged out."
          );
          setShowPopup(true);
          return { error: true, message: "Invalid Token" }; // Return early
        }
        return response;
      }

      if (response.status === 403) {
        navigate("/AccessDeniedPage");
        return { error: true, message: "Access Denied" };
      }

      return response;
    } catch (error) {
      console.error("An error occurred in useApi:", error);
      return { error: true, message: "Something went wrong." };
    }
  };

  return { callApi, showPopup, popupMessage, setShowPopup };
};

export default useApi;
