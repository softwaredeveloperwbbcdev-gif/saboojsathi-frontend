import {
  HiOutlineInformationCircle,
  HiOutlineXMark,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

const RejectedCauseModal = ({ causeData, onClose }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="h-1.5 w-full bg-amber-500" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
      >
        <HiOutlineXMark className="w-6 h-6" />
      </button>

      <div className="p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-4">
            <HiOutlineShieldExclamation className="text-amber-600 dark:text-amber-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Rejection Details
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Information regarding the declined application
          </p>
        </div>

        <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Reject Reason
            </label>
            <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg mt-1">
              {causeData?.reject_description || "Reason not specified"}
            </p>
          </div>

          {causeData?.reject_reason && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Reject Remark
              </label>
              <p className="text-slate-700 dark:text-slate-300 mt-1 italic">
                {causeData.reject_reason}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-all active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RejectedCauseModal;
