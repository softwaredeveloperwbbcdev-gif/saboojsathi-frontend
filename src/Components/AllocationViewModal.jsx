const AllocationViewModal = ({ data, onClose }) => {
  const total = data.reduce((sum, row) => sum + row.current_allocation, 0);
  return (
    <div className="p-4">
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center">
          {/* A simple SVG Icon for the header */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-indigo-500 mr-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Challan Allocation Details
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto md:overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sl. No.
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                School Name
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Allocated Cycle
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {row.school_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                  {row.current_allocation}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="2"
                className="px-4 py-3 text-right text-sm font-bold text-gray-900 dark:text-white"
              >
                Total
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">
                {total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllocationViewModal;
