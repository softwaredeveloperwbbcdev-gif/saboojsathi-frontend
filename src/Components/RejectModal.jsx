import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useApi from "../Hooks/useApi"; // Import the useApi hook
import { useNavigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri"; // Import a relevant icon
import { toast } from "react-toastify";

// InputLabel and TextInput components (assumed to be styled)
const InputLabel = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);

const TextInput = ({ className = "", ...props }) => (
  <input
    className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${className}`}
    {...props}
  />
);

const SelectInput = ({ className = "", ...props }) => (
  <select
    className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${className}`}
    {...props}
  />
);

//
const RejectModal = ({ applicantid, onClose, phaseId }) => {
  const navigate = useNavigate();
  const { callApi } = useApi(); // Use the useApi hook
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [rejectData, setRejectData] = useState([]);
  const watchReasonCode = watch("reason");

  const fetchLists = async () => {
    const response = await callApi("get", "getRejectList");

    console.log(response);
    if (!response.error) {
      setRejectData(response.data);
    } else {
      console.error("Failed to fetch reject list:", response.message);
    }
  };

  useEffect(() => {
    if (applicantid) {
      setValue("applicantId", applicantid);
    }
  }, [applicantid, setValue]);

  useEffect(() => {
    if (watchReasonCode !== "3") {
      setValue("reasonDetails", "");
    }
  }, [watchReasonCode, setValue]);

  useEffect(() => {
    fetchLists();
  }, []);

  const onSubmit = async (formData) => {
    console.log("Submitting updated data:", formData);
    // Use callApi for the reject_student API call
    const response = await callApi("post", "rejectstudent", formData);
    if (!response.error) {
      toast.success(response.message);
      onClose();
      navigate(`/StudentProfile/${phaseId}`);
    } else {
      // alert(response.message);
      toast.error(`Failed to reject student: ${response.message}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 transform transition-transform duration-300 scale-95 md:scale-100">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <RiErrorWarningLine className="text-red-500 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Reject Application
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Applicant ID */}
        <div>
          <InputLabel
            htmlFor="applicantId"
            className="text-gray-700 dark:text-gray-300"
          >
            Applicant ID
          </InputLabel>
          <TextInput
            id="applicantId"
            readOnly
            {...register("applicantId")}
            className="mt-1 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Reject Reason */}
        <div>
          <InputLabel
            htmlFor="reason"
            className="text-gray-700 dark:text-gray-300"
          >
            Reject Reason <span className="text-red-500">*</span>
          </InputLabel>
          <SelectInput
            id="reason"
            {...register("reason", { required: "This field is required" })}
            className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Reason</option>
            {rejectData.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.desc}
              </option>
            ))}
          </SelectInput>
          {errors.reason && (
            <p className="mt-1 text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>

        {/* Other options */}
        {watchReasonCode === "3" && (
          <div>
            <InputLabel
              htmlFor="reasonDetails"
              className="text-gray-700 dark:text-gray-300"
            >
              Please specify the reason <span className="text-red-500">*</span>
            </InputLabel>
            <TextInput
              type="text"
              id="reasonDetails"
              {...register("reasonDetails", {
                required: "Please specify the reason",
              })}
              className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.reasonDetails && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.reasonDetails.message}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reject
          </button>
        </div>
      </form>
    </div>
  );
};

export default RejectModal;
