import { TokenProvider } from "./ContextProvider/TokenContext";
import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <TokenProvider>
        <AppRoutes />
        <ToastContainer />
      </TokenProvider>
    </React.StrictMode>
  );
}

export default App;
