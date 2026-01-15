import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCalendar,
  HiOutlineFilter,
  HiCheckBadge,
} from "react-icons/hi2";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import SelectInput from "../../../Components/SelectInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import Modal from "../../../Components/Modal";
import RejectModal from "../../../Components/RejectModal";
import StudentView from "../../../Components/StudentComponent/StudentView";
import StudentListTable from "../../../Components/StudentComponent/StudentListTable";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ViewProfile() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const navigate = useNavigate();

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [finializeBtn, setFinializeBtn] = useState(false);
  const [applicantId, setApplicantId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [studentData, setStudentData] = useState([]);

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const { phase, year, phaseName } = phaseDetails;
  const schoolName = user.name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      status_code: "1",
      year: year,
      sortField: "(applicant_section, applicant_roll_no)",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await callApi("POST", "studentsProfile", data);
    if (res.data?.status === "success") {
      setStudents(res.data.studentdata);
      setFinializeBtn(res.data.finialize_status);
    } else {
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, []);

  const handleOnChange = (name, value) => {
    setValue(name, value, { shouldDirty: true, shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  const finilize_student = async () => {
    if (
      window.confirm(
        "Are you sure you want to finalize all verified students? This action cannot be undone."
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

  const editApplicantDetails = (appId) =>
    navigate(`/StudentEdit/${btoa(appId)}/${phaseId}`);
  const handleReject = (id) => {
    setApplicantId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalView = () => {
    setStudentData([]);
    setIsModalOpenView(false);
  };
  const viewRejectedCause = (id) => console.log("Rejection cause for:", id);

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class IX <span className="text-blue-600">Phase {phaseName}</span>
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
                className="w-full rounded-2xl border-slate-200 focus:ring-4 focus:ring-blue-100 transition-all dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="1">Pending</option>
                <option value="2">Verified</option>
                <option value="3">Finalized</option>
                <option value="4">Approved</option>
                <option value="5">Rejected</option>
              </SelectInput>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <HiOutlineCalendar className="text-blue-500" /> Academic Year
              </label>
              <SelectInput
                {...register("year")}
                className="w-full rounded-2xl border-slate-200 focus:ring-4 focus:ring-blue-100 transition-all dark:bg-gray-800 dark:border-gray-700"
              >
                <option value={year}>{year}</option>
              </SelectInput>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <HiOutlineAdjustmentsHorizontal className="text-blue-500" />{" "}
                Sort Order
              </label>
              <SelectInput
                {...register("sortField")}
                onChange={(e) => handleOnChange("sortField", e.target.value)}
                className="w-full rounded-2xl border-slate-200 focus:ring-4 focus:ring-blue-100 transition-all dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="(applicant_section, applicant_roll_no)">
                  Section & Roll
                </option>
                <option value="applicant_id">Applicant ID</option>
                <option value="applicant_name">Student Name</option>
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
          />
        </div>

        {/* Action Footer */}
        {finializeBtn && (
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
