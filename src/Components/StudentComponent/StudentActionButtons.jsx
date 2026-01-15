import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  HiEye,
  HiPencilSquare,
  HiCheckBadge,
  HiXCircle,
  HiExclamationTriangle,
  HiEllipsisVertical,
  HiArrowUpTray,
} from "react-icons/hi2";

const StudentActionButtons = ({ applicantId, status, id, handlers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.right - 208,
    });
    setIsOpen((prev) => !prev);
  };

  const {
    viewApplicantDetails,
    editApplicantDetails,
    handleReject,
    viewRejectedCause,
    uploadDistributionDetails,
  } = handlers;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    {
      label: "Upload Distribution Details",
      icon: HiArrowUpTray,
      show: status == 4, // APPROVED ONLY
      color: "emerald",
      onClick: () => uploadDistributionDetails(applicantId),
    },
  ];

  return (
    <>
      {/* DESKTOP VIEW */}
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
              </button>
            )
        )}
      </div>
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="xl:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <HiEllipsisVertical className="text-2xl text-gray-600 dark:text-gray-400" />
      </button>

      {/* Portal Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border py-2"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase border-b mb-1">
              Actions
            </div>

            {actions.map(
              (action, idx) =>
                action.show && (
                  <button
                    key={idx}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <action.icon className="text-lg text-sky-500" />
                    {action.label}
                  </button>
                )
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default StudentActionButtons;
