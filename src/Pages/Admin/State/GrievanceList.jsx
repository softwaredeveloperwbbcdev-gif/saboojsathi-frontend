import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import {
  FaEye,
  FaReply,
  FaSyncAlt,
  FaTicketAlt,
  FaTimes,
  FaUser,
  FaFileArchive,
  FaHistory,
  FaGlobe,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";

function GrievanceList() {
  const [loading, setLoading] = useState(false);
  const [detailModal, setDetailModal] = useState({ open: false, data: null });
  const [replyModal, setReplyModal] = useState({ open: false, data: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "default",
  );

  const { register, reset, watch } = useForm({
    defaultValues: { type: "", status: "", priority: "" },
  });

  const filterValues = watch();
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    types: [],
    priorities: [],
  });
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  // Sync theme for DataTable and Toasts
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : "default",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const fetchGrievances = async (filters = {}) => {
    setLoading(true);
    try {
      const payload = {
        grievance_type_id: filters.type || null,
        status_id: filters.status || null,
        priority_id: filters.priority || null,
      };
      const response = await callApi("POST", "/grievanceList", payload);
      // Ensure we set data correctly based on your API response structure
      setData(response?.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refreshes when filters change
  useEffect(() => {
    fetchGrievances(filterValues);
  }, [filterValues.type, filterValues.status, filterValues.priority]);

  const downloadZip = async (id, ticketNo) => {
    try {
      // 1. Ensure the API call explicitly requests 'blob'
      const response = await callApi(
        "POST",
        "/downloadAllAttachments",
        { grievanceId: btoa(id) },
        { responseType: "blob" }, // Make sure your useApi hook passes this to Axios/Fetch
      );

      // 2. CRITICAL: Check if response is already a Blob
      // If your API hook returns response.data, use that.
      const blob =
        response instanceof Blob
          ? response
          : new Blob([response.data || response], { type: "application/zip" });

      // 3. Create the download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Grievance_${ticketNo}.zip`);

      document.body.appendChild(link);
      link.click();

      // 4. Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up memory
      toast.success("Download started");
    } catch (e) {
      console.error("ZIP Error:", e);
      toast.error("Download failed");
    }
  };

  // FIXED REPLY: Validates, Closes Modal, Shows Toast, Refreshes List
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const status_id = formData.get("status_id");
    const message = formData.get("message")?.trim();

    if (!status_id || !message) {
      toast.warning("Both Status and Message are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        grievance_id: btoa(replyModal.data.id),
        reply_by: 19,
        reply_type: 2,
        message: message,
        status_id: status_id,
      };

      const response = await callApi("POST", "/grievanceReplay", payload);

      // We check for various success indicators based on common API patterns
      if (response && (response.status === true || response.error === false)) {
        toast.success("Reply posted successfully!");
        setReplyModal({ open: false, data: null }); // CLOSE MODAL
        fetchGrievances(filterValues); // REFRESH TABLE
      } else {
        toast.error(response?.message || "Failed to submit reply");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      name: "#",
      width: "60px",
      // Use row index. Note: if you use remote pagination,
      // you'll need to add (currentPage * itemsPerPage) to this index.
      cell: (row, index) => (
        <span className="font-bold text-slate-500">{index + 1}</span>
      ),
    },
    {
      name: "Ticket Number",
      grow: 2,
      selector: (row) => row.ticket_no,
      sortable: true,
      cell: (row) => (
        <span className="font-black text-indigo-600 dark:text-indigo-400">
          {row.ticket_no}
        </span>
      ),
    },
    {
      name: "Complainant",
      // grow: 2,
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {row.complainant_name}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {row.email_id}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {row.contact_no}
          </span>
        </div>
      ),
    },
    {
      name: "Type",
      cell: (row) => (
        <span className="text-[10px] font-bold text-slate-500 uppercase">
          {row.type?.type_name || "N/A"}
        </span>
      ),
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      cell: (row) => (
        <span className="font-black text-indigo-600 dark:text-indigo-400">
          {row.subject}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
            row.status_id === 3
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {row.status?.status_name}
        </span>
      ),
    },
    {
      name: "Priority",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
            row.priority_id === 3
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {row.priority?.priority_name}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => (
        <span className="font-black text-indigo-600 dark:text-indigo-400">
          {row.created_at}
        </span>
      ),
    },
    {
      name: "Closed At",
      selector: (row) => row.closed_at,
      sortable: true,
      cell: (row) => (
        <span className="font-black text-indigo-600 dark:text-indigo-400">
          {row.closed_at}
        </span>
      ),
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => setDetailModal({ open: true, data: row })}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
          >
            <FaEye />
          </button>
          {row.status_id !== 3 && (
            <button
              onClick={() => setReplyModal({ open: true, data: row })}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
            >
              <FaReply />
            </button>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "24px", // Bigger font
        fontWeight: "800", // Extra bold
        textTransform: "uppercase", // Professional look
        letterSpacing: "0.5px",
        color: "#475569", // slate-600
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f8fafc", // slate-50 background for header
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#e2e8f0", // slate-200
        minHeight: "56px", // Taller header row
      },
    },
  };

  return (
    <AdminAuthenticatedLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] p-4 md:p-8">
        <ToastContainer
          theme={currentTheme === "dark" ? "dark" : "light"}
          autoClose={3000}
        />

        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Grievance <span className="text-indigo-600">Portal</span>
          </h1>
        </div>

        {/* Filters - Explicitly named Type */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border dark:border-slate-700 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <FilterWrapper label="Grievance Type">
            <select
              {...register("type")}
              className="w-full bg-transparent border-none text-sm font-bold text-slate-700 dark:text-white focus:ring-0 cursor-pointer"
            >
              <option
                value=""
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                All Types
              </option>
              <option
                value="1"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                SCHOOL
              </option>
              <option
                value="2"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                STUDENT
              </option>
              <option
                value="3"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                CYCLE
              </option>
            </select>
          </FilterWrapper>

          <FilterWrapper label="Priority">
            <select
              {...register("priority")}
              className="w-full bg-transparent border-none text-sm font-bold text-slate-700 dark:text-white focus:ring-0 cursor-pointer"
            >
              <option
                value=""
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                All Priorities
              </option>
              <option
                value="1"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                LOW
              </option>
              <option
                value="2"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                MEDIUM
              </option>
              <option
                value="3"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                HIGH
              </option>
            </select>
          </FilterWrapper>

          <FilterWrapper label="Current Status">
            <select
              {...register("status")}
              className="w-full bg-transparent border-none text-sm font-bold text-slate-700 dark:text-white focus:ring-0 cursor-pointer"
            >
              <option
                value=""
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                All Statuses
              </option>
              <option
                value="1"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                Pending
              </option>
              <option
                value="2"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                In Progress
              </option>
              <option
                value="3"
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                Completed
              </option>
            </select>
          </FilterWrapper>

          <button
            onClick={() => reset()}
            className="h-[52px] bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <FaSyncAlt /> Clear Filters
          </button>
        </div>

        {/* Main Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border dark:border-slate-800 overflow-hidden">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={data}
              pagination
              theme={currentTheme === "dark" ? "dark" : "default"}
              // Single customStyles prop with conditional logic
              customStyles={currentTheme === "dark" ? darkStyles : lightStyles}
              highlightOnHover
              pointerOnHover
              responsive
            />
          )}
        </div>

        {/* FULL VIEW MODAL */}
        {detailModal.open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <FaTicketAlt />
                  </div>
                  <h3 className="font-black dark:text-white uppercase tracking-tight">
                    Ticket Detail: {detailModal.data.ticket_no}
                  </h3>
                </div>
                <button
                  onClick={() => setDetailModal({ open: false, data: null })}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <DetailSection title="Complainant" icon={<FaUser />}>
                    <DetailRow
                      label="Full Name"
                      value={detailModal.data.complainant_name}
                    />
                    <DetailRow
                      label="Email"
                      value={detailModal.data.email_id}
                    />
                    <DetailRow
                      label="Phone"
                      value={detailModal.data.contact_no}
                    />
                  </DetailSection>

                  <DetailSection title="System Info" icon={<FaGlobe />}>
                    <DetailRow
                      label="IP Address"
                      value={detailModal.data.ip_address}
                    />
                    <DetailRow
                      label="Device"
                      value={`${detailModal.data.device} (${detailModal.data.browser})`}
                    />
                    <DetailRow label="Source" value={detailModal.data.source} />
                  </DetailSection>

                  {detailModal.data.attachments?.length > 0 && (
                    <button
                      onClick={() =>
                        downloadZip(
                          detailModal.data.id,
                          detailModal.data.ticket_no,
                        )
                      }
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <FaFileArchive /> Download All Attachments
                    </button>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] border dark:border-slate-700">
                    <h2 className="text-lg font-black dark:text-white mb-2">
                      {detailModal.data.subject}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                      {detailModal.data.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-500 flex items-center gap-2">
                      <FaHistory /> Reply Logs
                    </h4>
                    {detailModal.data.replies?.length > 0 ? (
                      detailModal.data.replies.map((r, i) => (
                        <div
                          key={i}
                          className="p-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm"
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-[9px] font-black text-indigo-600">
                              {r.reply_type === 2 ? "ADMIN" : "USER"}
                            </span>
                            <span className="text-[9px] text-slate-400 font-bold">
                              {r.created_at}
                            </span>
                          </div>
                          <p className="text-xs dark:text-slate-300 italic">
                            "{r.message}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        No communication history found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPLAY MODAL */}
        {replyModal.open && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border dark:border-slate-700">
              <div className="p-6 bg-emerald-600 text-white font-black flex justify-between uppercase">
                <span>Send Resolution</span>
                <button
                  onClick={() => setReplyModal({ open: false, data: null })}
                >
                  <FaTimes />
                </button>
              </div>
              <form className="p-8 space-y-6" onSubmit={handleReplySubmit}>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    New Status
                  </label>
                  <select
                    name="status_id"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Result</option>
                    <option value="2">In Progress</option>
                    <option value="3">Mark as Completed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 rounded-xl p-4 text-sm dark:text-white h-36 resize-none outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Type response..."
                  ></textarea>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-emerald-700"
                >
                  {isSubmitting ? "Sending..." : "Submit Reply"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* optional session popup: reuses existing showPopup from useApi */}
        {showPopup && popupMessage && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md px-4 py-3 max-w-xs">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {popupMessage}
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    handleLogout();
                    setShowPopup(false);
                  }}
                  className="text-sm text-sky-600 hover:underline"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthenticatedLayout>
  );
}

// Helpers
const FilterWrapper = ({ label, children }) => (
  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl focus-within:border-indigo-500 transition-all">
    <label className="text-[9px] font-black text-indigo-500 uppercase block mb-0.5">
      {label}
    </label>
    {children}
  </div>
);

const DetailSection = ({ title, icon, children }) => (
  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-3xl border dark:border-slate-700">
    <h5 className="text-[10px] font-black text-indigo-500 uppercase flex items-center gap-2 mb-4">
      {icon} {title}
    </h5>
    <div className="space-y-3">{children}</div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase">{label}</p>
    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
      {value || "---"}
    </p>
  </div>
);

const lightStyles = {
  headRow: {
    style: {
      backgroundColor: "#f8fafc",
      borderBottomColor: "#e2e8f0",
      minHeight: "56px",
    },
  },
  headCells: {
    style: {
      fontSize: "13px", // Bigger font
      fontWeight: "800", // Extra bold
      textTransform: "uppercase",
      color: "#4f46e5", // Indigo-600
      letterSpacing: "0.5px",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      color: "#334155",
    },
  },
};

const darkStyles = {
  headRow: {
    style: {
      backgroundColor: "#0f172a",
      borderBottomColor: "#1e293b",
      minHeight: "56px",
    },
  },
  headCells: {
    style: {
      fontSize: "13px",
      fontWeight: "800",
      textTransform: "uppercase",
      color: "#818cf8", // Indigo-400
      letterSpacing: "0.5px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      borderBottomColor: "#1e293b",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      borderTopColor: "#1e293b",
    },
  },
};

export default GrievanceList;
