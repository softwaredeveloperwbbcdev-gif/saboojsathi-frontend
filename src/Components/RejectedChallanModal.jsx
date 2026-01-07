const InputLabel = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    {children}
  </label>
);

const RejectedChallanModal = ({ rejectedMsg, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300">
      {/* Header with a prominent icon */}
      <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
        <svg
          className="mx-auto h-12 w-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
          Rejection Details
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This challan has been rejected for the following reason:
        </p>
      </div>

      {/* Modal Body with rejection message */}
      <div className="p-6">
        <div className="mb-4">
          <InputLabel htmlFor="rejection-cause">Rejection Cause</InputLabel>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <p
              id="rejection-cause"
              className="text-base text-gray-800 dark:text-gray-200"
            >
              {rejectedMsg}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectedChallanModal;
