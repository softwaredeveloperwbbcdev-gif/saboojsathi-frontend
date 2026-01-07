import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const DistributionModal = ({ modaldata, frameupdate, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distributionDate: "",
      cycleFrameNumber: "",
      cycleBrand: "",
      applicantId: modaldata.details.applicantId,
    },
  });
  const [loading, setLoading] = useState(false); // loader

  // Update form with modaldata when it changes
  useEffect(() => {
    if (modaldata) {
      reset({
        distributionDate: modaldata.details.distribution_date || "",
        cycleFrameNumber: modaldata.details.cycle_frame_no || "",
        cycleBrand: String(modaldata.details.cycle_brand || "").trim(),
        applicantId: modaldata.details.applicant_id || "",
      });
    }
  }, [modaldata, reset]);

  const onSubmit = async (formData) => {
    const updatedData = {
      ...formData,
      applicantId: modaldata.details.applicant_id, // just to ensure consistency
    };

    const result = await frameupdate(updatedData);

    if (result?.validationErrors) {
      // Set validation errors on specific fields
      Object.entries(result.validationErrors).forEach(([field, messages]) => {
        setError(field, {
          type: "manual",
          message: messages[0], // Laravel returns array of messages per field
        });
      });
    }
    // sending back to parent -->check it later what is happening
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Update Distribution Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Applicant ID (read-only) */}
        <div className="relative">
          <label
            htmlFor="applicantId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Applicant's ID
          </label>
          <input
            type="text"
            id="applicantId"
            readOnly
            {...register("applicantId")}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400 transition-colors duration-500"
          />
          {errors.applicantId && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.applicantId.message}
            </p>
          )}
        </div>

        {/* Distribution Date */}
        <div className="relative">
          <label
            htmlFor="distributionDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Distribution Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="distributionDate"
            {...register("distributionDate", { required: "" })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
          />
          {errors.distributionDate && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.distributionDate.message}
            </p>
          )}
        </div>

        {/* Cycle Frame Number */}
        <div className="relative">
          <label
            htmlFor="cycleFrameNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Cycle Frame Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cycleFrameNumber"
            {...register("cycleFrameNumber", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
          />
          {errors.cycleFrameNumber && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.cycleFrameNumber.message}
            </p>
          )}
        </div>

        {/* Cycle Brand */}
        <div className="relative">
          <label
            htmlFor="cycleBrand"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Cycle Brand <span className="text-red-500">*</span>
          </label>
          <select
            id="cycleBrand"
            {...register("cycleBrand", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
          >
            <option value="">Select Cycle Brand</option>
            {modaldata.cycleList.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.desc}
              </option>
            ))}
          </select>
          {errors.cycleBrand && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.cycleBrand.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            UPDATE
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex items-center justify-center px-6 py-2 bg-red-600 dark:bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 dark:hover:bg-red-600 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default DistributionModal;
