import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiCheckBadge } from "react-icons/hi2";

import { HiOutlineFilter } from "react-icons/hi";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import SelectInput from "../../../Components/SelectInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import Modal from "../../../Components/Modal";
import RejectModal from "../../../Components/StudentComponent/RejectModal";
import StudentView from "../../../Components/StudentComponent/StudentView";
import StudentListTable from "../../../Components/StudentComponent/StudentListTable";
import DistributionModal from "../../../Components/StudentComponent/DistributionModal";
import RejectedCauseModal from "../../../Components/StudentComponent/RejectedCauseModal";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ViewProfile() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const navigate = useNavigate();

  // Dark Mode State
  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [finalizeBtn, setFinalizeBtn] = useState(false);
  const [applicantId, setApplicantId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [frameData, setFrameData] = useState({});
  const [currentStatus, setCurrentStatus] = useState("");
  const [isModalOpenCause, setIsModalOpenCause] = useState(false);
  const [rejectedCauseData, setRejectedCauseData] = useState(null);

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const { phase, year, phaseName } = phaseDetails;
  const schoolName = user.name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      status_code: localStorage.getItem("student_filter_status") || "",
      year: year,
      sortField: "(applicant_section, applicant_roll_no)",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await callApi("POST", "studentsProfile", data);
    if (res.data?.status === "success") {
      setStudents(res.data.studentdata);
      setFinalizeBtn(res.data.finalize_status);
    } else {
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, []);

  const handleOnChange = (name, value) => {
    if (name === "status_code") {
      setCurrentStatus(value); // Save to storage
    }
    setValue(name, value, { shouldDirty: true, shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  const finilize_student = async () => {
    if (
      window.confirm(
        "Are you sure you want to finalize all verified students? This action cannot be undone.",
      )
    ) {
      setLoading(true);
      try {
        const response = await callApi("POST", "finilizeStudent", {
          phaseId,
          internalCode: btoa(id),
        });

        if (response.error) {
          toast.error(`❌ ${response.message}`);
        } else {
          toast.success("✅ Students Finalized Successfully");
          handleOnChange("status_code", "3");
        }
      } catch (err) {
        toast.error("❌ An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
  };

  const viewApplicantDetails = async (id) => {
    setLoading(true);
    try {
      const res = await callApi("GET", `studentProfile/${btoa(id)}/${phaseId}`);
      if (!res.error) {
        setStudentData(res.data);
        setIsModalOpenView(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const editApplicantDetails = (appId) => {
    localStorage.setItem("student_filter_status", currentStatus);
    navigate(`/StudentEdit/${btoa(appId)}/${phaseId}`);
  };
  const handleReject = (id) => {
    setApplicantId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalView = () => {
    setStudentData([]);
    setIsModalOpenView(false);
  };

  const uploadDistributionDetails = async (id) => {
    setLoading(true);
    try {
      // Use the callApi function for the GET request
      const response = await callApi(
        "GET",
        `studentFrameView/${phaseId}/${btoa(id)}`,
      );

      if (response.error) {
        toast.error("Failed to fetch student details:", response.message);
        // The useApi hook handles the popup for 401, but we can handle other errors here.
      } else {
        setFrameData(response.data);
        //toast.success("Student details fetched successfully:", response.data);
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  const frameUpdate = async (frameData) => {
    setLoading(true);
    console.log(frameData);
    const updatedFrameData = {
      ...frameData,
      phaseId: phaseId,
      id: frameData.applicant_id,
    };

    try {
      const response = await callApi(
        "POST",
        "studentFrameUpdate",
        updatedFrameData,
      );

      if (response.error) {
        if (response.message === "Validation Errors") {
          return { validationErrors: response.errors };
        } else if (
          response.message ===
          "Duplicate frame number and brand already assigned to another applicant."
        ) {
          toast.error(response.message);
        } else {
          toast.error("Failed to update frame:", response);
        }
      } else {
        toast.success("Distribution Details Uploaded", response);
        handleCloseModalUpdate();
        getStudentsDistributionView();
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModalUpdate = () => {
    setIsModalOpenUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  useEffect(() => {
    if (frameData && Object.keys(frameData).length > 0) {
      handleOpenModalUpdate();
    }
  }, [frameData]);

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

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student List Class IX{" "}
            <span className="text-blue-600">Phase {phaseName}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
            {schoolName} • Academic Year {year}
          </p>
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-slate-200 dark:border-gray-800 p-6 mb-8 transition-all">
          <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase text-xs font-bold tracking-widest">
            <HiOutlineFilter className="text-lg" />
            Filter Applications
          </div>

          <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <HiCheckBadge className="text-blue-500" /> Status
              </label>
              <SelectInput
                {...register("status_code")}
                onChange={(e) => handleOnChange("status_code", e.target.value)}
                className="w-full border-slate-200 transition-all dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">All</option>
                <option value="1">Pending</option>
                <option value="2">Verified</option>
                <option value="3">Finalized</option>
                <option value="4">Approved</option>
                <option value="5">Rejected</option>
              </SelectInput>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="relative group">
          <StudentListTable
            students={students}
            viewApplicantDetails={viewApplicantDetails}
            editApplicantDetails={editApplicantDetails}
            handleReject={handleReject}
            viewRejectedCause={viewRejectedCause}
            uploadDistributionDetails={uploadDistributionDetails}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Action Footer */}
        {finalizeBtn && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={finilize_student}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transform transition hover:-translate-y-1 active:scale-95"
            >
              <HiCheckBadge className="text-xl" />
              Finalize Applications
            </button>
          </div>
        )}

        {/* Global Loader */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">
                Processing...
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Modals */}
      <Modal show={isModalOpen} onClose={handleCloseModal} maxWidth="md">
        <RejectModal
          applicantid={applicantId}
          onClose={handleCloseModal}
          phaseId={phaseId}
        />
      </Modal>

      <Modal
        show={isModalOpenView}
        onClose={handleCloseModalView}
        maxWidth="7xl"
      >
        <StudentView
          student={studentData}
          closeHandler={handleCloseModalView}
        />
      </Modal>

      <Modal
        show={isModalOpenUpdate}
        onClose={handleCloseModalUpdate}
        maxWidth="md"
        closeable={true}
      >
        <DistributionModal
          modaldata={frameData}
          frameupdate={frameUpdate}
          onClose={handleCloseModalUpdate}
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
}

export default ViewProfile;
