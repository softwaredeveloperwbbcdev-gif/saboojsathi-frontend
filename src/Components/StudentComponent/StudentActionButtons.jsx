import React from "react";
import {
  HiEye,
  HiPencilSquare,
  HiCheckBadge,
  HiXCircle,
  HiExclamationTriangle,
  HiEllipsisVertical,
} from "react-icons/hi2";

const StudentActionButtons = ({ applicantId, status, id, handlers }) => {
  const {
    viewApplicantDetails,
    editApplicantDetails,
    handleReject,
    viewRejectedCause,
  } = handlers;

  const getBtnClass = (color) => `
    p-2 rounded-xl transition-all duration-200 active:scale-90 group relative
    ${
      color === "blue"
        ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
        : color === "sky"
        ? "bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white"
        : color === "red"
        ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
        : "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white"
    }
  `;

  const actions = [
    {
      label: "View Details",
      icon: HiEye,
      show: true,
      color: "blue",
      onClick: () => viewApplicantDetails(applicantId),
    },
    {
      label: "Verify Student",
      icon: HiCheckBadge,
      show: status == 1,
      color: "sky",
      onClick: () => editApplicantDetails(id),
    },
    {
      label: "Edit Profile",
      icon: HiPencilSquare,
      show: status == 2,
      color: "sky",
      onClick: () => editApplicantDetails(id),
    },
    {
      label: "Reject Application",
      icon: HiXCircle,
      show: [1, 2].includes(Number(status)),
      color: "red",
      onClick: () => handleReject(id),
    },
    {
      label: "View Rejection Cause",
      icon: HiExclamationTriangle,
      show: status == 5,
      color: "warning",
      onClick: viewRejectedCause,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      {/* DESKTOP VIEW: Visible only above 1280px (xl) */}
      <div className="hidden xl:flex items-center gap-1.5">
        {actions.map(
          (action, idx) =>
            action.show && (
              <button
                key={idx}
                onClick={action.onClick}
                className={getBtnClass(action.color)}
                title={action.label}
              >
                <action.icon className="text-xl" />
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {action.label}
                </span>
              </button>
            )
        )}
      </div>

      {/* COLLAPSED VIEW: Visible below 1280px (xl) */}
      <div className="xl:hidden relative group">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none">
          <HiEllipsisVertical className="text-2xl text-gray-600 dark:text-gray-400" />
        </button>

        {/* High Z-Index Dropdown */}
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-[110] invisible group-focus-within:visible opacity-0 group-focus-within:opacity-100 transition-all transform scale-95 group-focus-within:scale-100 origin-top-right">
          <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800 mb-1">
            Actions
          </div>
          {actions.map(
            (action, idx) =>
              action.show && (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <action.icon
                    className={`text-lg ${
                      action.color === "red"
                        ? "text-red-500"
                        : action.color === "blue"
                        ? "text-blue-500"
                        : "text-sky-500"
                    }`}
                  />
                  <span className="font-medium">{action.label}</span>
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentActionButtons;
