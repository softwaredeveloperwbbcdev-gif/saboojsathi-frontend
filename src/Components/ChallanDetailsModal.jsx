import React from "react";

/**
 * A responsive modal to display linked challan details for an invoice.
 */
const ChallanDetailsModal = ({
  isOpen,
  onClose,
  invoiceNo,
  challanData = [], // Default to empty array for safety
  onDownloadPdf,
}) => {
  if (!isOpen) {
    return null;
  }

  // Calculate total cycles
  const totalCycles = challanData.reduce(
    (total, row) => total + Number(row.no_of_cycles || 0),
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challan-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose} // Close modal on backdrop click
      />

      {/* Modal Panel */}
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between rounded-t-lg border-b p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-gray-900 dark:text-white"
              id="challan-modal-title" // for aria-labelledby
            >
              Challan Details
            </h3>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose} // Use the prop
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Showing challans linked to Invoice No:{" "}
            <strong className="text-gray-900 dark:text-white">
              {invoiceNo}
            </strong>
          </p>
          <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Sl. No.
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Challan Number
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Challan Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Type of Bicycle
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    No. of Bicycles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {challanData && challanData.length > 0 ? (
                  <>
                    {challanData.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                          <button
                            onClick={
                              () => onDownloadPdf(row.challan_no, row.phase) // Use the prop
                            }
                            className="font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {row.challan_no}
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                          {row.challan_date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                          {row.type_cycle}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                          {row.no_of_cycles}
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-gray-50 font-bold dark:bg-gray-700">
                      <td
                        className="px-6 py-4 text-right text-sm uppercase text-gray-800 dark:text-gray-100"
                        colSpan={4}
                      >
                        Total
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-800 dark:text-gray-100">
                        {totalCycles}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No challan data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end rounded-b-lg border-t p-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose} // Use the prop
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 dark:focus:ring-offset-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallanDetailsModal;
