import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useApi from "../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiOutlineExclamationTriangle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineArrowUturnLeft, // Icon for Cancel
} from "react-icons/hi2";

const RejectModal = ({ applicantid, onClose, phaseId, setLoader, user }) => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [rejectData, setRejectData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const watchReasonCode = watch("reason");

  const fetchLists = async () => {
    const response = await callApi("get", "getRejectList");
    if (!response.error) {
      setRejectData(response.data);
    }
  };

  useEffect(() => {
    if (applicantid) setValue("applicantId", applicantid);
  }, [applicantid, setValue]);

  useEffect(() => {
    if (watchReasonCode !== "3") setValue("reasonDetails", "");
  }, [watchReasonCode, setValue]);

  useEffect(() => {
    fetchLists();
  }, []);

  const onSubmit = async (formData) => {
    setLoader(true);
    const action = "reject";
    try {
      const res = await callApi("POST", "approveRejectStudentList", {
        phaseId,
        status: action,
        applicants: applicantid,
        rejectId: formData.reason,
        rejectReason: formData.reasonDetails,
      });
      if (res.data?.status === "success") {
        toast.success(
          `Successfully ${action === "approve" ? "Approved" : "Rejected"}`,
        );
        navigate(
          user.stake_cd === "0601"
            ? `/CircleVerifyListSchool/${phaseId}`
            : `/DistrictVerifyListSchool/${phaseId}`,
        );
      }
    } finally {
      setLoader(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
      {/* Top Decorative Bar */}
      <div className="h-1.5 w-full bg-red-500" />

      {/* Close Button (X) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
      >
        <HiOutlineXMark className="w-6 h-6" />
      </button>

      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
            {/* Increased main icon size */}
            <HiOutlineExclamationTriangle className="text-red-600 dark:text-red-500 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Reject Application
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            Please select a reason for rejecting this application. This action
            will notify the relevant department.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Reason Selection */}
          <div className="relative">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">
              <HiOutlineChatBubbleBottomCenterText className="w-5 h-5 text-slate-400" />{" "}
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <select
              {...register("reason", { required: "Please select a reason" })}
              className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border ${errors.reason ? "border-red-500" : "border-slate-200 dark:border-slate-700"} rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer`}
            >
              <option value="">Choose a reason...</option>
              {rejectData.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.desc}
                </option>
              ))}
            </select>
            {errors.reason && (
              <span className="text-red-500 text-xs mt-1.5 ml-1 inline-block">
                {errors.reason.message}
              </span>
            )}
          </div>

          {/* Conditional Reason Details */}
          {watchReasonCode === "3" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                Specific Details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("reasonDetails", {
                  required: "Details are required",
                })}
                placeholder="Explain why this student is being rejected..."
                rows="3"
                className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border ${errors.reasonDetails ? "border-red-500" : "border-slate-200 dark:border-slate-700"} rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
              />
              {errors.reasonDetails && (
                <span className="text-red-500 text-xs mt-1.5 ml-1 inline-block">
                  {errors.reasonDetails.message}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons (Smaller) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 text-sm"
            >
              <HiOutlineArrowUturnLeft className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  Confirm
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectModal;
