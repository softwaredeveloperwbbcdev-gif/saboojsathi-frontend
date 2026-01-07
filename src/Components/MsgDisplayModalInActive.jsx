import React, { useEffect } from "react";

const MsgDisplayModalInActive = ({ remainingTime, onStayActive }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
        <h2 className="text-lg font-bold text-red-600 mb-2">
          ⚠️ Inactivity Detected
        </h2>
        <p className="mb-3">
          You'll be logged out in <strong>{remainingTime}</strong> seconds.
        </p>
        <button
          onClick={onStayActive}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Stay Logged In
        </button>
      </div>
    </div>
  );
};

export default MsgDisplayModalInActive;
