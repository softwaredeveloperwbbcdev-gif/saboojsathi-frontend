// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// const DistributionModal = ({ modaldata, frameupdate, onClose }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       distributionDate: "",
//       cycleFrameNumber: "",
//       cycleBrand: "",
//       applicantId: modaldata.details.applicantId,
//     },
//   });
//   const [loading, setLoading] = useState(false); // loader

//   // Update form with modaldata when it changes
//   useEffect(() => {
//     if (modaldata) {
//       reset({
//         distributionDate: modaldata.details.distribution_date || "",
//         cycleFrameNumber: modaldata.details.cycle_frame_no || "",
//         cycleBrand: String(modaldata.details.cycle_brand || "").trim(),
//         applicantId: modaldata.details.applicant_id || "",
//       });
//     }
//   }, [modaldata, reset]);

//   const onSubmit = async (formData) => {
//     const updatedData = {
//       ...formData,
//       applicantId: modaldata.details.applicant_id, // just to ensure consistency
//     };

//     const result = await frameupdate(updatedData);

//     if (result?.validationErrors) {
//       // Set validation errors on specific fields
//       Object.entries(result.validationErrors).forEach(([field, messages]) => {
//         setError(field, {
//           type: "manual",
//           message: messages[0], // Laravel returns array of messages per field
//         });
//       });
//     }
//     // sending back to parent -->check it later what is happening
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700 transition-colors duration-500">
//       <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
//         Update Distribution Details
//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Applicant ID (read-only) */}
//         <div className="relative">
//           <label
//             htmlFor="applicantId"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Applicant's ID
//           </label>
//           <input
//             type="text"
//             id="applicantId"
//             readOnly
//             {...register("applicantId")}
//             className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400 transition-colors duration-500"
//           />
//           {errors.applicantId && (
//             <p className="mt-1 text-red-500 text-sm">
//               {errors.applicantId.message}
//             </p>
//           )}
//         </div>

//         {/* Distribution Date */}
//         <div className="relative">
//           <label
//             htmlFor="distributionDate"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Distribution Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             id="distributionDate"
//             {...register("distributionDate", { required: "" })}
//             className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
//           />
//           {errors.distributionDate && (
//             <p className="mt-1 text-red-500 text-sm">
//               {errors.distributionDate.message}
//             </p>
//           )}
//         </div>

//         {/* Cycle Frame Number */}
//         <div className="relative">
//           <label
//             htmlFor="cycleFrameNumber"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Cycle Frame Number <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="cycleFrameNumber"
//             {...register("cycleFrameNumber", { required: true })}
//             className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
//           />
//           {errors.cycleFrameNumber && (
//             <p className="mt-1 text-red-500 text-sm">
//               {errors.cycleFrameNumber.message}
//             </p>
//           )}
//         </div>

//         {/* Cycle Brand */}
//         <div className="relative">
//           <label
//             htmlFor="cycleBrand"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Cycle Brand <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="cycleBrand"
//             {...register("cycleBrand", { required: true })}
//             className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
//           >
//             <option value="">Select Cycle Brand</option>
//             {modaldata.cycleList.map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.desc}
//               </option>
//             ))}
//           </select>
//           {errors.cycleBrand && (
//             <p className="mt-1 text-red-500 text-sm">
//               {errors.cycleBrand.message}
//             </p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mr-2 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//             UPDATE
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={loading}
//             className="flex items-center justify-center px-6 py-2 bg-red-600 dark:bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 dark:hover:bg-red-600 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             CANCEL
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DistributionModal;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineIdentification,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiOutlineTruck,
} from "react-icons/hi2";

const DistributionModal = ({ modaldata, frameupdate, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      applicantId: modaldata?.details?.applicant_id || "",
    },
  });

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
    setIsSubmitting(true);
    const result = await frameupdate({
      ...formData,
      applicantId: modaldata.details.applicant_id,
    });

    if (result?.validationErrors) {
      Object.entries(result.validationErrors).forEach(([field, messages]) => {
        setError(field, { type: "manual", message: messages[0] });
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
      {/* Accent Header */}
      <div className="h-1.5 w-full bg-blue-600" />

      {/* Close Button (X) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors z-10"
      >
        <HiOutlineXMark className="w-6 h-6" />
      </button>

      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4">
            <HiOutlineTruck className="text-blue-600 dark:text-blue-400 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Distribution Details
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Update frame and brand tracking for this applicant.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Applicant ID (Read Only) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
              <HiOutlineIdentification className="w-5 h-5 text-slate-400" />{" "}
              Applicant ID
            </label>
            <input
              {...register("applicantId")}
              readOnly
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Distribution Date */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                <HiOutlineCalendar className="w-5 h-5 text-slate-400" /> Date{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("distributionDate", {
                  required: "Date is required",
                })}
                className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.distributionDate ? "border-red-500" : "border-slate-200 dark:border-slate-700"} rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
              />
              {errors.distributionDate && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  {errors.distributionDate.message}
                </span>
              )}
            </div>

            {/* Cycle Brand */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                <HiOutlineTag className="w-5 h-5 text-slate-400" /> Brand{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                {...register("cycleBrand", { required: "Select a brand" })}
                className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.cycleBrand ? "border-red-500" : "border-slate-200 dark:border-slate-700"} rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer appearance-none`}
              >
                <option value="">Select Brand</option>
                {modaldata.cycleList.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cycle Frame Number */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
              <HiOutlineTag className="w-5 h-5 text-slate-400" /> Cycle Frame
              Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter frame number..."
              {...register("cycleFrameNumber", {
                required: "Frame number is required",
              })}
              className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.cycleFrameNumber ? "border-red-500" : "border-slate-200 dark:border-slate-700"} rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
            />
            {errors.cycleFrameNumber && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {errors.cycleFrameNumber.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 order-2 sm:order-1 px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 order-1 sm:order-2 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributionModal;
