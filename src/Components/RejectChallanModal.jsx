import { useForm } from "react-hook-form";

// Note: Assuming a simple wrapper component for the label
const InputLabel = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    {children}
  </label>
);

const RejectChallanModal = ({ modaldata, rejectChallan, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (formData) => {
    const rejectChallanData = {
      ...formData,
      ...modaldata,
    };
    rejectChallan(rejectChallanData);
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300">
      {/* Header with a prominent icon */}
      <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
          Reject Challan
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Are you sure you want to reject this challan? Please provide a reason
          below.
        </p>
      </div>

      {/* Modal Body with Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputLabel htmlFor="reject_reason">
              Reason/Cause for Rejection
            </InputLabel>
            <textarea
              name="reject_reason"
              id="reject_reason"
              rows="4"
              placeholder="Enter the reason for rejection..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 p-3 text-base transition-colors"
              {...register("reject_reason", { required: true })}
            ></textarea>
            {errors.reject_reason && (
              <p className="text-red-500 text-sm mt-1">
                This field is required.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectChallanModal;
