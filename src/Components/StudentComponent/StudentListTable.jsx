import DataTable from "react-data-table-component";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiCloudArrowDown,
  HiPlusCircle,
} from "react-icons/hi2";
import StudentActionButtons from "./StudentActionButtons";

const StudentListTable = ({
  students,
  viewApplicantDetails,
  editApplicantDetails,
  handleReject,
  viewRejectedCause,
  uploadDistributionDetails,
  isDarkMode, // Pass this prop from the parent or call useDarkMode() here
}) => {
  // --- Helpers for Status and Source ---
  const getStatusBadge = (status) => {
    const statusMap = {
      1: {
        text: "Pending",
        class:
          "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
      },
      2: {
        text: "Verified",
        class:
          "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      },
      3: {
        text: "Finalized",
        class:
          "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
      },
      4: {
        text: "Approved",
        class:
          "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
      },
      5: {
        text: "Rejected",
        class:
          "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
      },
    };
    const config = statusMap[status] || {
      text: "Unknown",
      class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.class}`}
      >
        {config.text}
      </span>
    );
  };

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

  const getSourceTag = (sourceStatus, source) => (
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {sourceStatus == 2 ? (
        <>
          <HiPlusCircle className="text-teal-500 text-sm" /> {source}
        </>
      ) : (
        <>
          <HiCloudArrowDown className="text-blue-500 text-sm" /> {source}
        </>
      )}
    </div>
  );

  // --- Table Column Definitions ---
  const columns = [
    {
      name: "Sl. No.",
      width: "80px",
      center: true,
      cell: (row, index) => (
        <div className="font-semibold text-gray-500 dark:text-gray-400">
          {index + 1}
        </div>
      ),
    },
    {
      name: "Applicant ID / Name",
      grow: 2,
      selector: (row) => row.name,
      sortable: true,
      center: true,
      cell: (row) => (
        <div className="py-3 text-center">
          <div className="text-[14px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
            #{row.id}
          </div>
          <div className="font-bold text-gray-900 dark:text-white text-sm">
            {row.name}
          </div>
        </div>
      ),
    },
    {
      name: "Guardian / Relation",
      hide: "sm",
      center: true,
      cell: (row) => (
        <div className="text-center">
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {row.guardian}
          </div>
          <div className="text-xs text-gray-500 italic">
            {row.relationship || "Guardian"}
          </div>
        </div>
      ),
    },
    {
      name: "Gender / DOB",
      hide: "md",
      center: true,
      cell: (row) => (
        <div className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
            <HiOutlineUser className="text-gray-400" /> {row.gender}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
            <HiOutlineCalendar className="text-gray-400" /> {row.dob}
          </div>
        </div>
      ),
    },
    {
      name: "Sec / Roll",
      width: "120px",
      sortable: true,
      center: true,
      cell: (row) => (
        <div className="flex flex-col items-center border-x lg:border-none border-gray-100 dark:border-gray-800 px-4">
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            Sec: {row.section}
          </span>
          <span className="text-xs text-gray-500">Roll: {row.roll}</span>
        </div>
      ),
    },
    {
      name: "Status / Source",
      grow: 1,
      center: true,
      cell: (row) => (
        <div className="space-y-1.5 flex flex-col items-center">
          {getStatusBadge(row.status)}
          {getSourceTag(row.source_status, row.source)}
        </div>
      ),
    },
    {
      name: "Action",
      center: true,
      minWidth: "120px",
      grow: 1,
      cell: (row) => (
        <div className="flex justify-center w-full px-2">
          <StudentActionButtons
            applicantId={row.id}
            status={row.status}
            id={row.id}
            handlers={{
              viewApplicantDetails,
              editApplicantDetails,
              handleReject,
              viewRejectedCause,
              uploadDistributionDetails,
            }}
          />
        </div>
      ),
    },
  ];

  // --- Dynamic Dark Mode Custom Styles ---
  const getCustomStyles = (isDark) => ({
    table: {
      style: {
        backgroundColor: "transparent",
        overflow: "visible !important",
      },
    },
    headRow: {
      style: {
        backgroundColor: isDark ? "#1e293b" : "#f8fafc",
        borderTopWidth: "1px",
        borderColor: isDark ? "#334155" : "#e2e8f0",
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        color: isDark ? "#cbd5e1" : "#1e293b",
        fontSize: "12px",
        fontWeight: "800",
        textTransform: "uppercase",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        minHeight: "80px",
        backgroundColor: isDark ? "#0f172a" : "#ffffff", // slate-900 : white
        color: isDark ? "#94a3b8" : "#475569",
        overflow: "visible !important",
        borderRadius: "0px !important", // ✅ Force edges to be square
        "&:not(:last-child)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: isDark ? "#1e293b" : "#f1f5f9",
          borderRadius: "0px !important",
        },
        "&:hover": {
          backgroundColor: isDark ? "#1e293b" : "#f8fafc",
          transition: "all 0.2s",
          borderRadius: "0px !important", // ✅ Ensure hover state is also square
        },
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        overflow: "visible !important",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    pagination: {
      style: {
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#cbd5e1" : "#1e293b",
        borderTop: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
        // ✅ Apply the rounding here to the very bottom element
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem",
      },
      pageButtonsStyle: {
        fill: isDark ? "#cbd5e1" : "#1e293b",
        "&:hover:not(:disabled)": {
          backgroundColor: isDark ? "#334155" : "#f1f5f9",
        },
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[1.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
      <DataTable
        columns={columns}
        data={students}
        pagination
        customStyles={getCustomStyles(isDarkMode)}
        responsive
        noHeader
        progressComponent={
          <div className="p-10 text-teal-600 animate-pulse font-bold bg-white dark:bg-gray-900 w-full text-center">
            Loading Students...
          </div>
        }
        noDataComponent={<NoDataMessage isDarkMode={isDarkMode} />}
      />
    </div>
  );
};

export default StudentListTable;
