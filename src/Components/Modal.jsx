import { useEffect } from "react";

export default function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {},
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && closeable) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeable, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    xs: "sm:max-w-xs",
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[1033] flex items-center justify-center px-4 py-6 bg-gray-500/75 dark:bg-gray-900/75 transition-all"
      onClick={handleBackdropClick}
    >
      {/* <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
      > */}
      {/* <div className="sticky top-0 z-10 flex justify-end p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={handleBackdropClick}
        className="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-600"
        aria-label="Close modal"
      >
        X
      </button>
    </div> */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all sm:mx-auto sm:w-full ${maxWidthClass} max-h-[80vh] overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
}
