import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MsgDisplayModal = ({
  msg,
  applicantId,
  setShowModal,
  setSuccessMessage,
  edit = null,
  phaseId = null,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (edit === 1) {
      const timer = setTimeout(() => {
        navigate(`/StudentProfile/${phaseId}`);
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [edit]);

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleNewEntry = () => {
    closeModal();
    navigate(`/StudentProfile/${phaseId}`);
  };

  const handleDashboard = () => {
    closeModal();
    navigate(`/StudentProfile/${phaseId}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close modal"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ✅ {applicantId ? "Registration Successful!" : "Notice"}
        </h2>

        <p className="text-gray-700 mb-2">{msg}</p>

        {applicantId && (
          <p className="text-blue-600 font-semibold mb-4">
            Applicant ID: <span className="font-mono">{applicantId}</span>
          </p>
        )}

        <div className="flex flex-col gap-3 mt-4">
          {applicantId ? (
            <>
              <button
                onClick={handleNewEntry}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                ➕ Add Another Registration
              </button>
              <button
                onClick={handleDashboard}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                📃 View Applicant List
              </button>
            </>
          ) : edit == 1 ? (
            ""
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/LoginList");
              }}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              🔐 Login Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MsgDisplayModal;
