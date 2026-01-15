import React from "react";
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
}) => {
  // --- Helpers for Status and Source ---
  const getStatusBadge = (status) => {
    const statusMap = {
      1: {
        text: "Pending",
        class: "bg-amber-100 text-amber-700 border-amber-200",
      },
      2: {
        text: "Verified",
        class: "bg-blue-100 text-blue-700 border-blue-200",
      },
      3: {
        text: "Finalized",
        class: "bg-indigo-100 text-indigo-700 border-indigo-200",
      },
      4: {
        text: "Approved",
        class: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      5: { text: "Rejected", class: "bg-red-100 text-red-700 border-red-200" },
    };
    const config = statusMap[status] || {
      text: "Unknown",
      class: "bg-gray-100 text-gray-600",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.class}`}
      >
        {config.text}
      </span>
    );
  };

  const getSourceTag = (sourceStatus, source) => (
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
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
        <div className="font-semibold text-gray-500">{index + 1}</div>
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
          <div className="text-[14px] font-mono font-bold text-gray-400 uppercase tracking-tighter">
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

  // --- Modern Custom Styles ---
  const customStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
        overflow: "visible !important",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        borderTopWidth: "1px",
        borderColor: "#e2e8f0",
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        color: "#1e293b",
        fontSize: "12px",
        fontWeight: "800",
        textTransform: "uppercase",
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    rows: {
      style: {
        minHeight: "80px",
        overflow: "visible !important",
        "&:not(:last-child)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "#f1f5f9",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
          transition: "all 0.2s",
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
        borderTop: "1px solid #e2e8f0",
        borderRadius: "0 0 1.5rem 1.5rem",
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
      <DataTable
        columns={columns}
        data={students}
        pagination
        highlightOnHover
        customStyles={customStyles}
        responsive
        noHeader
        progressComponent={
          <div className="p-10 text-teal-600 animate-pulse font-bold">
            Loading Students...
          </div>
        }
      />
    </div>
  );
};

export default StudentListTable;
