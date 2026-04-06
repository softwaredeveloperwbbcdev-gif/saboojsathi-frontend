import AdminAuthenticatedLayout from "../../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useState, useEffect } from "react";
import Modal from "../../../../Components/Modal";
import StudentView from "../../Student/Old/StudentView";
import { useParams } from "react-router-dom";
import useApi from "../../../../Hooks/useApi";
import LogoutPopup from "../../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../../Utils/Constants/Constants";

const ApprovedListView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const user = JSON.parse(atob(localStorage.getItem("user")));

  const schoolName = user.name;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // loader
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState([]); // data of each student to be view

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `approvedListView/${phaseId}`);

      if (response.error) {
        toast.error("Failed to fetch students:", response.message);
        setStudents([]);
      } else {
        if (response.data.length > 0) {
          setStudents(response.data);
        } else {
          setStudents([]);
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  // Call on component mount
  useEffect(() => {
    getStudents();
  }, []);

  const viewApplicantDetails = async (id) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `studentProfile/${btoa(id)}/${phaseId}`
      );
      const res = response;
      console.log(res.data);
      if (res.error) {
        setStudentData(null);
        toast.error("Failed to fetch applicant details:", response.message);
      } else {
        setStudentData(res.data);
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
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

  return (
    <div>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Approve Application Under{" "}
            {schoolName
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
            Class IX Phase for Academic Year {phaseDetails.year}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl. No.
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
                    Source
                  </th>
                  <th scope="col" className="p-4">
                    Status
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="text-center p-4 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  // Map over studentData if there are students
                  students.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{student.applicant_id}</td>
                      <td className="p-4">{student.applicant_name}</td>
                      <td className="p-4">{student.applicant_guardian_name}</td>
                      <td className="p-4">{student.applicant_dob}</td>
                      <td className="p-4">{student.class}</td>
                      <td className="p-4">{student.gender}</td>
                      <td className="p-4">
                        {student.source == 1 ? "Banglar Shiksha" : "New Entry"}
                      </td>
                      <td className="p-4">Approved</td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            viewApplicantDetails(student.applicant_id);
                          }}
                          className="bg-blue-500 border-blue-600 rounded-md py-2 px-2 text-sm text-white mx-1 hover:bg-blue-700 hover:border-blue-800"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
    </div>
  );
};

export default ApprovedListView;
