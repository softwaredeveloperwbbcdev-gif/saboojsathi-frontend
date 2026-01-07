import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { IoIosWarning } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import Modal from "../../../Components/Modal";
import RejectModal from "../../../Components/RejectModal";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ViewProfile() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loader
  const [students, setStudents] = useState([]); // view list of all students
  const [finializeBtn, setFinializeBtn] = useState(false); // data of each student to be view
  const [applicantId, setApplicantId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(atob(localStorage.getItem("user")));

  const phase = phaseDetails["phase"];
  const year = phaseDetails["year"];
  const phaseName = phaseDetails["phaseName"];
  const schoolName = user.name;
  const id = user.internal_code;

  const finilize_student = async () => {
    const result = window.confirm("Do you want to finalize?");

    if (result) {
      setLoading(true);
      const data = {
        phaseId: phaseId,
        internalCode: btoa(id),
      };

      try {
        const response = await callApi("POST", "finilizeStudent", data);

        if (response.error) {
          toast.error(`❌ Failed to finalize student: ${response.message}`);
        } else {
          toast.success("✅ Finalization Sucessful");
          setValue("status_code", "2", {
            shouldDirty: true,
            shouldValidate: true,
          });
          handleSubmit(onSubmit)();
        }
      } catch (err) {
        // This catches unexpected errors not handled by the hook (e.g., network issues)
        console.error("❌ Unexpected error:", err);
        toast.error("❌ An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      status_code: "1",
      year: year,
      sortField: "(applicant_section, applicant_roll_no)",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await callApi("POST", "studentsProfile", data);

    if (res.data.status == "success") {
      setStudents(res.data.studentdata);
      setFinializeBtn(res.data.finialize_status);
      console.log(res.data.finialize_status);
    } else if (res.status == "fail") {
      setStudents([]);
    }
    setLoading(false);
  };

  // Call on component mount
  useEffect(() => {
    handleSubmit(onSubmit)();
  }, []);

  // Call on change of value
  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };
  ////////////////////////////////////

  const viewRecjectedCause = (id, e) => {
    console.log(id);
    console.log(e);
  };

  const editApplicantDetails = (applicantId) => {
    navigate(`/StudentEdit/${btoa(applicantId)}/${phaseId}`);
  };

  const handleReject = (id) => {
    setApplicantId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        {/* Page Heading */}
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Class IX Phase {phaseName} Application under{" "}
            {schoolName
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
            (AY {year})
          </h1>
          {/* Page Heading */}
          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input type="hidden" name="phase" value={phase} />
                <div className="flex-1">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="status_code"
                      {...register("status_code")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="1">Pending</option>
                      <option value="2">Verified</option>
                      <option value="3">Finalized</option>
                      <option value="4">Approved</option>
                      <option value="5">Rejected</option>
                    </SelectInput>
                    <InputLabel
                      htmlFor="status_code"
                      value="Application Status"
                      mandatory={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="year"
                      {...register("year")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value={year}>{year}</option>
                    </SelectInput>
                    <InputLabel htmlFor="year" value="Year" mandatory={false} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="sortField"
                      {...register("sortField")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="(applicant_section, applicant_roll_no)">
                        Section & Roll Number
                      </option>
                      <option value="applicant_id">Applicant ID</option>
                      <option value="applicant_name">Student Name</option>
                    </SelectInput>
                    <InputLabel
                      htmlFor="sortField"
                      value={"Sort By"}
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Table Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl.No.
                  </th>
                  <th scope="col" className="p-4">
                    Applicant ID
                  </th>
                  <th scope="col" className="p-4">
                    Applicant Name
                  </th>
                  <th scope="col" className="p-4">
                    Guardian Name
                  </th>
                  <th scope="col" className="p-4">
                    DOB
                  </th>
                  <th scope="col" className="p-4">
                    Section
                  </th>
                  <th scope="col" className="p-4">
                    Roll No.
                  </th>
                  <th scope="col" className="p-4">
                    Gender
                  </th>
                  <th scope="col" className="p-4">
                    Source
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="p-4">{student.id}</td>
                    <td className="p-4 font-semibold">{student.name}</td>
                    <td className="p-4">{student.guardian}</td>
                    <td className="p-4">{student.dob}</td>
                    <td className="p-4">{student.section}</td>
                    <td className="p-4">{student.roll}</td>
                    <td className="p-4">{student.gender}</td>
                    <td className="p-4">{student.source}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {student.status == 1 && student.source_status == 2 && (
                          <button
                            onClick={() => editApplicantDetails(student.id)}
                            className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-sky-600 transition-colors"
                          >
                            Edit
                          </button>
                        )}
                        {student.status == 1 &&
                          student.source_status == 1 &&
                          student.declaration != 1 && (
                            <button
                              onClick={() => editApplicantDetails(student.id)}
                              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors"
                            >
                              Verify
                            </button>
                          )}
                        {student.status == 1 &&
                          student.source_status == 1 &&
                          student.declaration == 1 && (
                            <span className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-sm cursor-not-allowed">
                              Verified
                            </span>
                          )}
                        {student.status == 1 &&
                          student.source == 2 &&
                          student.declaration == 1 && (
                            <span className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md text-sm cursor-not-allowed">
                              Finalized
                            </span>
                          )}
                        {student.status == 1 && (
                          <button
                            onClick={() => handleReject(student.id)}
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        )}
                        {student.status == 5 && (
                          <button
                            onClick={viewRecjectedCause}
                            className="bg-red-600 text-white font-semibold py-1 px-3 rounded-md text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
                          >
                            <IoIosWarning /> Rejected
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {finializeBtn && (
            <button
              onClick={finilize_student}
              className="bg-blue-900 text-white p-2 rounded-md justify-end m-3 hover:bg-blue-700"
            >
              Finalize
            </button>
          )}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
        </section>
        {/* Main Content */}
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        closeable={true}
      >
        <RejectModal
          applicantid={applicantId}
          onClose={handleCloseModal}
          phaseId={phaseId}
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
      {/* Modal section */}
    </>
  );
}

export default ViewProfile;
