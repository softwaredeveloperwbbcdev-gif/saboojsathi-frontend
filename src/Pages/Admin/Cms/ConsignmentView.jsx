import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import { useForm } from "react-hook-form";

import Modal from "../../../Components/Modal";
import ConsignmentViewInModel from "./ConsignmentViewInModel";
import ShowMsgDisplayModal from "../../../Components/MsgDisplayModal";
import { useNavigate } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Moon,
  Sun,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// const ConfirmationModal = ({
//   show,
//   onClose,
//   onConfirm,
//   title,
//   children,
//   icon: Icon = AlertTriangle, // Default to warning
//   iconColor = "text-red-600",
//   confirmText = "Confirm",
//   confirmColor = "bg-red-600 hover:bg-red-700",
// }) => {
//   if (!show) {
//     return null;
//   }

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//       onClick={onClose}
//     >
//       <div className="fixed inset-0 bg-black/50 transition-opacity" />
//       <div
//         className="relative z-50 w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800"
//         onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
//       >
//         <div className="flex sm:items-start">
//           <div
//             className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
//               iconColor === "text-red-600"
//                 ? "bg-red-100 dark:bg-red-900"
//                 : "bg-green-100 dark:bg-green-900"
//             } sm:mx-0 sm:h-10 sm:w-10`}
//           >
//             <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
//           </div>
//           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             <h3
//               className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
//               id="modal-title"
//             >
//               {title}
//             </h3>
//             <div className="mt-2">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {children}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//           <button
//             type="button"
//             className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${confirmColor} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
//             onClick={onConfirm}
//           >
//             {confirmText}
//           </button>
//           <button
//             type="button"
//             className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const ConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  title,
  children, // This is where the custom content (like the select/textarea) will go
  icon: Icon = AlertTriangle,
  iconColor = "text-red-600",
  confirmText = "Confirm",
  confirmColor = "bg-red-600 hover:bg-red-700",
}) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50 transition-opacity" />
      <div
        className="relative z-50 w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex sm:items-start">
          <div
            className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
              iconColor === "text-red-600"
                ? "bg-red-100 dark:bg-red-900"
                : "bg-green-100 dark:bg-green-900"
            } sm:mx-0 sm:h-10 sm:w-10`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
              id="modal-title"
            >
              {title}
            </h3>
            <div className="mt-2">
              {/* Renders the custom content (reason select/textarea) passed as children */}
              {children}
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            id="do_action_reject" // Added ID for clarity
            className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${confirmColor} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            type="button"
            id="cancel_action_reject" // Added ID for clarity
            className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setIsDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isDark;
};

const InputLabel = ({ htmlFor, value, className = "", children }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
  >
    {value || children}
  </label>
);

const SelectInput = ({ children, className = "", ...props }) => (
  <select
    className={`mt-1 block w-full px-3 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const TextInput = ({ className = "", ...props }) => (
  <input
    type="text"
    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${className}`}
    {...props}
  />
);

const ConsignmentView = () => {
  const user = JSON.parse(atob(localStorage.getItem("user"))) || {};
  const supplier_all_access = user.access?.supplier_all_access || null;
  const all_access = user.access?.all_access || null;

  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,

    formState: { errors }, // Contains validation errors
  } = useForm({});

  const district = watch("district");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [consignment, setConsignment] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cmsViewSearchDts, setCmsViewSearchDts] = useState({
    cphase: [],
    cdistricts: [],
    cblocks: [],
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [actionTarget, setActionTarget] = useState(null);

  const [deleteReasons, setDeleteReasons] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [validationError, setValidationError] = useState("");

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsconsignmentdistrictphase`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        //////////////////////////////////////
        if (response.data.block) {
          // when this condition then i want to set the district value and block value
          setCmsViewSearchDts((prev) => ({
            ...prev,
            cphase: response.data.phase || [],
            cdistricts: [
              {
                id: response.data.district[0].did,
                desc: response.data.district[0].ddesc,
              },
            ],
            cblocks: [
              {
                id: response.data.district[0].bid,
                desc: response.data.district[0].bdesc,
              },
            ],
          }));
          setDeleteReasons(response.data.reject_reasons || []);
        } else if (response.data.district_) {
          // when this condition then i want to set the district value
          setCmsViewSearchDts((prev) => ({
            ...prev,
            cphase: response.data.phase || [],
            cdistricts: response.data.district || [],
          }));
          setDeleteReasons(response.data.reject_reasons || []);
        } else {
          setCmsViewSearchDts((prev) => ({
            ...prev,
            cphase: response.data.phase || [],
            cdistricts: response.data.district || [],
          }));
        }
        //////////////////////////////////////
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (district) {
      fetchBlocks(district);
    }
  }, [district]);

  const fetchBlocks = async (districtChallan) => {
    ////////////////////////////////////////////////////////////////////
    setLoading(true);
    try {
      const response = await callApi("POST", `cmschallanblock`, {
        district: districtChallan,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        //////////////////////////////////////
        // setValue("district", districtChallan);
        setCmsViewSearchDts((prev) => ({
          ...prev,
          cblocks: response.data || [],
        }));

        // setValue("block", blockUserId);
        //////////////////////////////////////
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsconsignmentdata`, formdata);
      if (response.error) {
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const showViewConsignment = async (sl, t, p) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsviewconsignmentonmodel`, {
        db_serial: sl,
        tracking_no: t,
        phase: p,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setConsignment(response.data);
        setIsModalOpen(true);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    ///////////////////////////////////////////
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const msgDisplayClose = () => {
    setShowModal(false);
  };

  // Handlers to OPEN the confirmation modals
  const handleDeleteClick = (data) => {
    setActionTarget({
      sl: data.serial_no,
      t: data.tracking_no,
      p: data.phase,
    });
    setShowDeleteConfirm(true);
  };

  const handlePublishClick = (data) => {
    setActionTarget({
      sl: data.serial_no,
      t: data.tracking_no,
      p: data.phase,
    });
    setShowPublishConfirm(true);
  };

  // Handlers for modal CONFIRMATION
  const handlePublishConfirm = () => {
    if (actionTarget) {
      publishConsignment(actionTarget.sl, actionTarget.t, actionTarget.p);
    }
    setShowPublishConfirm(false);
    setActionTarget(null);
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setSelectedReasonId(value);
    setValidationError("");
    if (value !== "4") {
      setOtherReason("");
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedReasonId) {
      setValidationError("Please select a reason for delete.");
      return;
    }
    const isOtherSelected = selectedReasonId === "8";
    if (isOtherSelected && otherReason.trim() === "") {
      setValidationError("Please specify the reason in the text box.");
      return;
    }

    // 3. Deletion/API Call Logic
    if (actionTarget) {
      deleteConsignment(
        actionTarget.sl,
        actionTarget.t,
        actionTarget.p,
        selectedReasonId,
        otherReason.trim()
      );
    }
    // --- Replace this with your actual API call (e.g., axios.post('/api/delete-consignment', payload)) ---

    // Close modal on successful deletion
    setShowDeleteConfirm(false);
    setSelectedReasonId("");
    setOtherReason("");
  };

  const isOtherReasonActive = selectedReasonId === "8";

  const handleConfirmClose = () => {
    setShowDeleteConfirm(false);
    setShowPublishConfirm(false);
    setActionTarget(null);
    setSelectedReasonId("");
    setOtherReason("");
  };
  // --------------------------
  const publishConsignment = async (sl, t, p) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmspublishedconsignment`, {
        db_serial: sl,
        tracking_no: t,
        phase: p,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        toast.success(response.data.message);
        handleSubmit(onSubmit)();
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    ///////////////////////////////////////////
  };

  const deleteConsignment = async (sl, t, p, sri, or) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsdeleteconsignment`, {
        db_serial: sl,
        tracking_no: t,
        phase: p,
        reject_reason: sri,
        reject_reason_others: or,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        toast.success(response.data.message);
        handleSubmit(onSubmit)();
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    ///////////////////////////////////////////
  };
  const editConsignment = async (sl) => {
    navigate(`/consignment_view_edit/${sl}`);
  };

  const isDarkMode = useDarkMode();

  const getCustomStyles = (isDarkMode) => ({
    tableWrapper: {
      style: {
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        overflow: "hidden",
      },
    },
    table: {
      style: {
        width: "100%",
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
      },
    },
    rows: {
      style: {
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
        color: isDarkMode ? "#D1D5DB" : "#6B7280",
        fontSize: "0.875rem",
        borderBottom: "none",
        transition: "background-color 0.2s ease",
      },
      highlightOnHoverStyle: {
        backgroundColor: isDarkMode ? "#4B5563" : "#F1F5F9", // ✅ hover color
        color: isDarkMode ? "#F9FAFB" : "#111827",
        transition: "background-color 0.25s ease",
      },
    },
    headRow: {
      style: {
        backgroundColor: isDarkMode ? "#374151" : "#F9FAFB",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        fontSize: "0.75rem",
        fontWeight: "700",
        textTransform: "uppercase",
      },
    },
    headCells: {
      style: {
        padding: "1rem",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        backgroundColor: isDarkMode ? "#374151" : "#F9FAFB",
        borderBottom: "none",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        padding: "1rem",
        color: isDarkMode ? "#D1D5DB" : "#6B7280",
        justifyContent: "center",
      },
    },
    // ✅ Add pagination customization here
    pagination: {
      style: {
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        borderTop: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
        minHeight: "56px",
      },
      pageButtonsStyle: {
        borderRadius: "0.375rem",
        height: "32px",
        width: "32px",
        padding: "4px",
        margin: "0 2px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        backgroundColor: "transparent",

        "&:hover:not(:disabled)": {
          backgroundColor: isDarkMode ? "#4B5563" : "#E5E7EB",
          color: isDarkMode ? "#F9FAFB" : "#111827",
        },
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.5,
        },
        "&.rdt_Pagination-active": {
          backgroundColor: isDarkMode ? "#4B5563" : "#E5E7EB",
          color: isDarkMode ? "#F9FAFB" : "#111827",
        },
      },
    },
  });

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "Tracking No",
      selector: (data) => data.tracking_no,
      center: true,
    },
    {
      name: "Consignment No",
      selector: (data) => data.consignment_no,
      center: true,
    },
    {
      name: "Supplier",
      selector: (data) => data.supplier_name,
      center: true,
    },
    {
      name: "Block",
      selector: (data) => data.block_name,
      center: true,
    },
    {
      name: "Delivery Location",
      selector: (data) => data.delivery_location,
      center: true,
    },
    {
      name: "Qty. Boys",
      selector: (data) => data.qty_boys,
      center: true,
    },
    {
      name: "Qty. Girls",
      selector: (data) => data.qty_girls,
      center: true,
    },
    {
      name: "Action",
      center: true,
      cell: (data) => (
        <div className={`flex justify-between flex-wrap gap-2`}>
          <button
            className="flex items-center justify-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition shadow-sm"
            onClick={() =>
              showViewConsignment(data.serial_no, data.tracking_no, data.phase)
            }
          >
            <Eye size={14} className="mr-1 hidden sm:inline" /> View
          </button>
          {supplier_all_access != null || all_access != null ? (
            <>
              {data.lock_consignment === 1 ? (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-500 text-white text-xs rounded-lg font-medium">
                  <CheckCircle size={14} className="mr-1 hidden sm:inline" />{" "}
                  Published
                </span>
              ) : (
                <>
                  <button
                    className="flex items-center justify-center px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition shadow-sm"
                    onClick={() => handlePublishClick(data)}
                  >
                    <PlusCircle size={14} className="mr-1 hidden sm:inline" />{" "}
                    Publish
                  </button>
                  <button
                    className="flex items-center justify-center px-3 py-1 bg-cyan-600 text-white text-xs rounded-lg hover:bg-cyan-700 transition shadow-sm"
                    onClick={() => editConsignment(btoa(data.serial_no))}
                  >
                    <Edit size={14} className="mr-1 hidden sm:inline" /> Edit
                  </button>
                  <button
                    className="flex items-center justify-center px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition shadow-sm"
                    onClick={() => handleDeleteClick(data)}
                  >
                    <Trash2 size={14} className="mr-1 hidden sm:inline" />{" "}
                    Delete
                  </button>
                </>
              )}
            </>
          ) : null}
        </div>
      ),
    },
  ];

  const NoDataMessage = ({ isDarkMode }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
          textAlign: "center",
          backgroundColor: isDarkMode ? "#111827" : "#F9FAFB",
          color: isDarkMode ? "#D1D5DB" : "#6B7280",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          border: `1px dashed ${isDarkMode ? "#374151" : "#D1D5DB"}`,
          transition: "all 0.3s ease-in-out",
          width: "100%",
          minHeight: "180px",
          boxSizing: "border-box",
        }}
      >
        {/* Icon with subtle animation */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.4}
          stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
          fill="none"
          style={{
            width: "44px", // smaller size
            height: "44px",
            marginBottom: "1rem",
            opacity: 0.85,
            transform: "translateY(0)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.opacity = "0.85";
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
          />
        </svg>

        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "0.4rem",
            color: isDarkMode ? "#E5E7EB" : "#374151",
          }}
        >
          No Data Available
        </h2>

        <p
          style={{
            fontSize: "0.875rem",
            color: isDarkMode ? "#9CA3AF" : "#6B7280",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          There are currently no records to display. Try adjusting filters or
          adding new entries.
        </p>
      </div>
    );
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        {/* Filter Form Card */}
        <section className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900 md:p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-4 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
              <Search className="inline-block mr-2 w-5 h-5 text-indigo-500" />
              Search Filters
            </h3>

            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* District */}
                <div>
                  <InputLabel value="District" />
                  <SelectInput
                    name="district"
                    {...register("district", {
                      onChange: (e) =>
                        handleOnChange("district", e.target.value),
                    })}
                  >
                    <option value="">Select District</option>
                    {cmsViewSearchDts.cdistricts.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  {errors.district && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                {/* Block */}
                <div>
                  <InputLabel value="Block" />
                  <SelectInput
                    name="block"
                    {...register("block", {
                      onChange: (e) => handleOnChange("block", e.target.value),
                    })}
                  >
                    <option value="">Select Block</option>
                    {cmsViewSearchDts.cblocks.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>

                {/* Phase */}
                <div>
                  <InputLabel value="Phase" />
                  <SelectInput
                    name="phase"
                    {...register("phase", {
                      onChange: (e) => handleOnChange("phase", e.target.value),
                    })}
                  >
                    <option value="">Select Phase</option>
                    {cmsViewSearchDts.cphase.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>
            </form>
          </div>
          {/* Data Table and Search */}
          <div className="text-gray-600 p-3.5 relative flex justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">
              Consignment Data
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              customStyles={getCustomStyles(isDarkMode)}
              noDataComponent={<NoDataMessage isDarkMode={isDarkMode} />}
            />
          </div>

          {loading && <Loader />}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      <ConfirmationModal
        show={showPublishConfirm}
        onClose={handleConfirmClose}
        onConfirm={handlePublishConfirm}
        title="Publish Consignment"
        icon={CheckCircle}
        iconColor="text-green-600"
        confirmText="Publish"
        confirmColor="bg-green-600 hover:bg-green-700"
      >
        Are you sure you want to publish this consignment? This action will lock
        it from further edits.
      </ConfirmationModal>

      <ConfirmationModal
        show={showDeleteConfirm}
        onClose={handleConfirmClose}
        onConfirm={handleDeleteConfirm}
        title="Are you sure to delete this Consignment?"
        icon={AlertTriangle}
        iconColor="text-red-600"
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
      >
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Please select a reason for delete from the list below!
          </p>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-normal min-w-[70px]">
              Reason<span className="text-red-500">*</span>
            </label>
            <select
              id="reject_reason"
              name="reject_reason"
              className="form-select block w-full border border-gray-300 rounded-md shadow-sm p-2"
              style={{ width: "72%" }} // Keeping inline style for consistency with PHP example
              value={selectedReasonId}
              onChange={handleReasonChange}
            >
              <option value="">Select Reason</option>
              {deleteReasons.map((reason) => (
                // Important: Use String(reason.id) for select value consistency
                <option key={reason.id} value={String(reason.id)}>
                  {reason.cause}
                </option>
              ))}
            </select>
          </div>

          {/* Textarea for 'Other' reason - conditionally rendered */}
          {isOtherReasonActive && (
            <div className="mt-2 ml-[80px]">
              {" "}
              {/* Adjusted margin to align */}
              <textarea
                id="reject_reason_others"
                className="form-textarea block w-full border border-blue-600 rounded-md p-2 text-sm uppercase"
                placeholder="Mention Proper Reason"
                style={{ width: "86%" }} // Keeping inline style
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                maxLength="90"
              />
            </div>
          )}

          {/* Validation Error Message */}
          {validationError && (
            <p
              className="mt-2 ml-[80px] text-xs text-red-500"
              id="reject_reason_error_msg"
            >
              {validationError}
            </p>
          )}
        </div>
      </ConfirmationModal>
      {/* Modal for viewing consignment details */}
      <Modal
        show={isModalOpen}
        // onClose={handleCloseModal}
        maxWidth="2xl"
        closeable={true}
      >
        <ConsignmentViewInModel
          consignment={consignment}
          onClose={handleCloseModal}
        />
      </Modal>
      {/* Message Display Modal */}
      {showModal && (
        <ShowMsgDisplayModal
          msg={successMessage}
          setShowModal={setShowModal}
          onClose={msgDisplayClose}
        />
      )}
      {/* Logout Popup */}
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
};

export default ConsignmentView;
