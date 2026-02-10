import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineEye,
  HiOutlineArrowLeft,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Modal from "../../../Components/Modal";
import StudentView from "../../../Components/StudentComponent/StudentView";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import RejectedCauseModal from "../../../Components/StudentComponent/RejectedCauseModal";
import RejectModal from "../../../Components/CircleComponent/RejectModal";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ViewStudent = () => {
  const { schoolId, phaseId, status } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const navigate = useNavigate();

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);
  const [typeIs, setTypeIs] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [isModalOpenCause, setIsModalOpenCause] = useState(false);
  const [rejectedCauseData, setRejectedCauseData] = useState(null);
  const [applicantId, setApplicantId] = useState();

  // --- Status Badge Helper ---
  const getStatusBadge = (statusValue) => {
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
    const config = statusMap[statusValue] || {
      text: "Unknown",
      class:
        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200",
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-sm uppercase tracking-wide ${config.class}`}
      >
        {config.text}
      </span>
    );
  };

  const onLoadHandler = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `getSchoolVerifyApplicantList/${phaseId}/${schoolId}/${status}`,
      );
      if (response.data?.status === "success") {
        setData(response.data.schoolList);
        setTypeIs(response.data.statusName);
        setSchoolName(response.data.schoolName);
      }
    } catch (err) {
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadHandler();
  }, []);

  useEffect(() => {
    setSelectedIds(selectAll ? data.map((s) => s.applicant_id) : []);
  }, [selectAll, data]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const viewApplicantDetails = async (id) => {
    setLoading(true);
    try {
      const res = await callApi("GET", `studentProfile/${btoa(id)}/${phaseId}`);
      if (!res.error) {
        setStudentData(res.data);
        setIsModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action) => {
    if (selectedIds.length === 0)
      return toast.warning("Please select students first.");

    if (action === "reject") {
      setApplicantId(selectedIds);
      handleReject();
    } else {
      setLoading(true);
      try {
        const res = await callApi("POST", "approveRejectStudentList", {
          phaseId,
          status: action,
          applicants: selectedIds,
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
        setLoading(false);
      }
    }
  };

  const viewRejectedCause = async (appId) => {
    setLoading(true);
    try {
      // Assuming endpoint: getRejectedCause/{appId}/{phaseId}
      const res = await callApi("POST", `studentRejectedDetails`, {
        phaseId: phaseId,
        applicantId: btoa(appId),
      });
      if (!res.error) {
        setRejectedCauseData(res.data.details);
        setIsModalOpenCause(true);
      } else {
        toast.error("Could not fetch rejection reason");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModalCause = () => {
    setIsModalOpenCause(false);
    setRejectedCauseData(null);
  };

  const handleCloseModalReject = () => setIsModalOpenReject(false);

  const handleReject = () => setIsModalOpenReject(true);

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-all">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline"
            >
              <HiOutlineArrowLeft /> Back to List
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {typeIs} <span className="text-blue-600">Students</span>
            </h1>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <HiOutlineAcademicCap className="text-blue-500 text-lg" />
              <span className="font-semibold">{schoolName}</span>
              <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-bold">
                PHASE {phaseDetails.phaseName}
              </span>
            </div>
          </div>

          {typeIs === "Pending" && (
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={() => handleAction("reject")}
                className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-xl font-bold transition-all"
              >
                <HiOutlineXCircle className="text-xl" /> Reject
              </button>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
              <button
                onClick={() => handleAction("approve")}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all"
              >
                <HiOutlineCheckCircle className="text-xl" /> Approve Selected
              </button>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  {typeIs === "Pending" && (
                    <th className="p-5 text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                      />
                    </th>
                  )}
                  <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Student Info
                  </th>
                  <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Guardian / Class
                  </th>
                  <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Source
                  </th>
                  <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Verification Status
                  </th>
                  <th className="p-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.map((student) => (
                  <tr
                    key={student.applicant_id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {typeIs === "Pending" && (
                      <td className="p-5 text-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-slate-300 text-blue-600"
                          checked={selectedIds.includes(student.applicant_id)}
                          onChange={() =>
                            handleCheckboxChange(student.applicant_id)
                          }
                        />
                      </td>
                    )}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
                          {student.applicant_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {student.applicant_name}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 font-mono tracking-tight">
                            {student.applicant_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {student.applicant_guardian_name}
                      </div>
                      <div className="text-[10px] font-black text-blue-500 uppercase">
                        Class {student.class} • {student.stu_sex}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {student.source_status == 2
                          ? "New Entry"
                          : "Banglar Shiksha"}
                      </span>
                    </td>
                    <td className="p-5">
                      {/* Using the new getStatusBadge function */}
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            viewApplicantDetails(student.applicant_id)
                          }
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-all"
                          title="View Details"
                        >
                          <HiOutlineEye className="text-xl" />
                        </button>
                        {/* View Rejection Cause Button (Visible only when status is 5) */}
                        {student.status === 5 && (
                          <button
                            onClick={() =>
                              viewRejectedCause(student.applicant_id)
                            }
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                            title="View Rejection Cause"
                          >
                            <HiOutlineXCircle className="text-xl" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="p-20 text-center">
              <HiOutlineUserGroup className="mx-auto text-6xl text-slate-200 dark:text-slate-800 mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                No Applicants Found
              </p>
            </div>
          )}
        </div>

        {/* Global Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                Syncing Data
              </p>
            </div>
          </div>
        )}
      </section>
      {/* Modal & Popups */}
      {isModalOpen && studentData && (
        <Modal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="7xl"
          closeable={true}
        >
          <StudentView
            student={studentData}
            closeHandler={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      <Modal
        show={isModalOpenReject}
        onClose={handleCloseModalReject}
        maxWidth="md"
      >
        <RejectModal
          applicantid={applicantId}
          onClose={handleCloseModalReject}
          phaseId={phaseId}
          setLoader={setLoading}
          user={user}
        />
      </Modal>

      <Modal
        show={isModalOpenCause}
        onClose={handleCloseModalCause}
        maxWidth="md"
      >
        <RejectedCauseModal
          causeData={rejectedCauseData}
          onClose={handleCloseModalCause}
        />
      </Modal>

      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
    </AdminAuthenticatedLayout>
  );
};

export default ViewStudent;
