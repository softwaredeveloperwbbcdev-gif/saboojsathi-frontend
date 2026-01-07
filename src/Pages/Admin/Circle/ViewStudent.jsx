import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../Components/Modal";
import StudentView from "../Student/StudentView";
import { useNavigate } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ViewStudent = () => {
  const { schoolId, phaseId, status } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [typeIs, setTypeIs] = useState("");
  const [loading, setLoading] = useState(false); // loader
  const [studentData, setStudentData] = useState([]); // data of each student to be view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");

  const selectable = "multiple"; // or "single", based on your condition
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const onLoadHandler = async () => {
    setLoading(true);
    try {
      // Use the callApi hook to make the GET request
      const response = await callApi(
        "GET",
        `getSchoolVerifyApplicantList/${phaseId}/${schoolId}/${status}`
      );

      const res = response.data;
      if (res.status === "success") {
        setData(res.schoolList);
        setTypeIs(res.statusName);
        setSchoolName(res.schoolName);
      } else if (res.status === "fail") {
        setData([]);
        toast.error("Failed to load applicant list.");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadHandler();
  }, []);

  useEffect(() => {
    if (selectAll) {
      const allIds = data.map((student) => student.applicant_id);
      setSelectedIds(allIds);
    } else if (!selectAll) {
      setSelectedIds([]);
    }
    console.log(selectedIds);
  }, [selectAll]);

  const handleCheckboxChange = (id) => {
    if (selectable === "single") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
    console.log(selectedIds);
  };

  const viewApplicantDetails = async (id) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `studentProfile/${btoa(id)}/${phaseId}`
      );
      const res = response;
      if (res.error) {
        setStudentData(null);
        toast.error("Failed to load applicant profile.");
      } else {
        setStudentData(res.data);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentData && Object.keys(studentData).length > 0) {
      handleOpenModal();
    }
  }, [studentData]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setStudentData([]);
    setIsModalOpen(false);
  };
  // approve and reject
  const handleAction = async (event) => {
    console.log("Original Event:", event);
    // console.log("Selected IDs:", selectedIds);

    setLoading(true);
    const dataSet = {
      phaseId: phaseId,
      status: event,
      applicants: selectedIds,
    };

    // Use the callApi hook instead of the raw fetch call
    try {
      const res = await callApi("POST", "approveRejectStudentList", dataSet);

      if (res.data.status === "success") {
        toast.success(
          `Application's successfully ${
            event == "approve" ? "approved" : "rejected"
          }`
        );
        if (user.stake_cd == "0601") {
          navigate(`/CircleVerifyListSchool/${phaseId}`);
        } else {
          navigate(`/DistrictVerifyListSchool/${phaseId}`);
        }
      } else if (res.data.status === "fail") {
        // Use the useApi hook's popup state to display the error
        toast.error(
          `Application's failed to be ${
            event == "approve" ? "approved" : "rejected"
          } `
        );
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            {typeIs} Applications From {schoolName} phase{" "}
            {phaseDetails.phaseName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {status == btoa(2) && (
                    <th scope="col" className="p-4 rounded-tl-lg">
                      {/* {status == 2 } */}
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => setSelectAll((prev) => !prev)}
                      />
                    </th>
                  )}
                  <th scope="col" className="p-4">
                    Serial. No.
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
                    Class
                  </th>
                  <th scope="col" className="p-4">
                    Gender
                  </th>
                  <th scope="col" className="p-4">
                    Profile Status
                  </th>
                  <th scope="col" className="p-4">
                    Status
                  </th>
                  <th scope="col" className="p-4 text-center rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr
                    key={student.applicant_id + index}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {typeIs == "Pending" && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(student.applicant_id)}
                          onChange={() =>
                            handleCheckboxChange(student.applicant_id)
                          }
                          disabled={
                            selectable === "single" &&
                            selectedIds.length > 0 &&
                            !selectedIds.includes(student.applicant_id)
                          }
                        />
                      </td>
                    )}
                    {/* here check box will be added for all with options to select multiple value or single value upon some condition how to implememnt it CHAT gpt  */}
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{student.applicant_id}</td>
                    <td className="p-4">{student.applicant_name}</td>
                    <td className="p-4">{student.applicant_guardian_name}</td>
                    <td className="p-4">{student.applicant_dob_f}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">{student.stu_sex}</td>
                    <td className="p-4">
                      {student.source_status == 2
                        ? "New Entry"
                        : "Banglar Shiksha"}
                    </td>
                    <td className="p-4">
                      {student.status == 2 && student.active_status != "R"
                        ? "Finalized"
                        : student.status == 3 && student.active_status != "R"
                        ? "Approved"
                        : "Rejected"}
                    </td>
                    <td className="p-4">
                      {typeIs != "Rejected" && (
                        <button
                          onClick={() => {
                            viewApplicantDetails(student.applicant_id);
                          }}
                          className="bg-blue-500 border-blue-600 rounded-md py-2 px-2 text-sm text-white mx-1 hover:bg-blue-700 hover:border-blue-800"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {typeIs == "Pending" && (
              <div className="flex justify-end gap-3 mx-3 mb-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleAction("approve")}
                  // disabled={selectedIds.length === 0}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleAction("reject")}
                  // disabled={selectedIds.length === 0}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      {isModalOpen && studentData && (
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="7xl"
          closeable={true}
        >
          <StudentView student={studentData} closeHandler={handleCloseModal} />
        </Modal>
      )}
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
};

export default ViewStudent;
