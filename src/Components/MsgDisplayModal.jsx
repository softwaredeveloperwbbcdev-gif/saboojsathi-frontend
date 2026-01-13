import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiCheckCircle,
  HiPlusCircle,
  HiListBullet,
  HiXMark,
  HiLockClosed,
  HiCheck,
} from "react-icons/hi2";

import { HiOutlineDuplicate } from "react-icons/hi";

const MsgDisplayModal = ({
  msg,
  applicantId,
  setShowModal,
  setSuccessMessage,
  edit = null,
  phaseId = null,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (edit === 1) {
      const timer = setTimeout(() => {
        navigate(`/StudentProfile/${phaseId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [edit, navigate, phaseId]);

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicantId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewEntry = () => {
    closeModal();
    // Assuming StudentAdd is at this route or force refresh the current route
    window.location.reload();
  };

  const handleViewList = () => {
    closeModal();
    navigate(`/StudentProfile/${phaseId}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Modern Glass Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={edit !== 1 ? closeModal : undefined}
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-teal-500/20 p-8 text-center animate-in zoom-in-95 duration-300 border border-white/20">
        {/* Close Button (Only if not in auto-redirect edit mode) */}
        {edit !== 1 && (
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <HiXMark className="text-2xl" />
          </button>
        )}

        {/* Success Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20" />
            <div className="relative bg-teal-500 p-4 rounded-full shadow-lg shadow-teal-500/40">
              <HiCheckCircle className="text-4xl text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
          {applicantId ? "Registration Successful!" : "Action Noted"}
        </h2>

        {/* Success Message */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {msg}
        </p>

        {/* Applicant ID Card (Modern UX) */}
        {applicantId && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-8 border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Applicant Reference ID
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl font-mono font-bold text-teal-600 dark:text-teal-400 tracking-wider">
                {applicantId}
              </span>
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition-all ${
                  copied
                    ? "bg-teal-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                }`}
                title="Copy to clipboard"
              >
                {copied ? (
                  <HiCheck />
                ) : (
                  <HiOutlineDuplicate className="text-lg" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Auto-redirect indicator for Edit Mode */}
        {edit === 1 && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full animate-[progress_3s_linear]"
                style={{ width: "100%" }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to list in 3 seconds...
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {applicantId ? (
            <>
              <button
                onClick={handleNewEntry}
                className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-teal-500/25 active:scale-95"
              >
                <HiPlusCircle className="text-xl" />
                Add Another Student
              </button>
              <button
                onClick={handleViewList}
                className="flex items-center justify-center gap-2 w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95"
              >
                <HiListBullet className="text-xl" />
                View Applicant List
              </button>
            </>
          ) : edit === 1 ? null : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/LoginList");
              }}
              className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-500/25 active:scale-95"
            >
              <HiLockClosed className="text-xl" />
              Session Expired: Login Again
            </button>
          )}
        </div>
      </div>

      {/* Custom Keyframe for redirect bar (add to your global CSS if possible) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `,
        }}
      />
    </div>
  );
};

export default MsgDisplayModal;
