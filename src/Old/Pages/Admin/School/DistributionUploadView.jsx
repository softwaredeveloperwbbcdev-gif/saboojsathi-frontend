import AdminAuthenticatedLayout from "../../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import DistributionModal from "../../../../Components/DistributionModal";
import Modal from "../../../../Components/Modal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../../Hooks/useApi";
import LogoutPopup from "../../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../../Utils/Constants/Constants";

const DistributionUploadView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const phaseName = phaseDetails.phaseName;

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const schoolName = user.name;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(true); // loader
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frameData, setFrameData] = useState({}); // State to store modal data
  const [students, setStudents] = useState([]);
  const [buttonText, setButtonText] = useState({});
  /////////////////////////

  const getStudentsDistributionView = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `studentDistributionView/${phaseId}`
      );

      if (response.error) {
        console.error("Failed to fetch data:", response.message);
      } else {
        //console.log("studentsDistributionProfile--", response.data);
        setStudents(response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  // Call on component mount
  useEffect(() => {
    getStudentsDistributionView();
  }, []);
  /////////////////////////
  // return;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  ////////////////////////////

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
        updatedFrameData
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
        handleCloseModal();
        getStudentsDistributionView();
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  const UploadDetails = async (id) => {
    setLoading(true);
    try {
      // Use the callApi function for the GET request
      const response = await callApi(
        "GET",
        `studentFrameView/${phaseId}/${btoa(id)}`
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

  useEffect(() => {
    if (frameData && Object.keys(frameData).length > 0) {
      handleOpenModal();
    }
  }, [frameData]);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Update Distribution Details for{" "}
            {schoolName
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl. No.
                  </th>
                  <th scope="col" className="p-4">
                    Student ID
                  </th>
                  <th scope="col" className="p-4">
                    Student Name
                  </th>
                  <th scope="col" className="p-4">
                    Guardian Name
                  </th>
                  <th scope="col" className="p-4">
                    Gender
                  </th>
                  <th scope="col" className="p-4">
                    Class
                  </th>
                  <th scope="col" className="p-4">
                    Section
                  </th>
                  <th scope="col" className="p-4">
                    Roll
                  </th>
                  <th scope="col" className="p-4">
                    Regn No.
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Distribution Details
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
                      <td className="p-4">{student.guardian_name}</td>
                      <td className="p-4">{student.applicant_gender}</td>
                      <td className="p-4">
                        {/* {student.class} */}
                        IX
                      </td>
                      <td className="p-4">{student.section}</td>
                      <td className="p-4">{student.roll_no}</td>
                      <td className="p-4">{student.registration_no}</td>
                      <td className="p-4">
                        <button
                          onClick={() => UploadDetails(student.applicant_id)}
                          className={`p-2 rounded-md text-white 
                                                        ${
                                                          buttonText[
                                                            student.applicant_id
                                                          ] === "Entered" ||
                                                          student.cycle_distribution_date
                                                            ? "bg-green-600 hover:bg-green-500"
                                                            : buttonText[
                                                                student
                                                                  .applicant_id
                                                              ] === "Update" ||
                                                              !student.cycle_distribution_date
                                                            ? "bg-blue-900 hover:bg-blue-700"
                                                            : "bg-gray-500 hover:bg-gray-400"
                                                        } 
                                                    `}
                          disabled={
                            buttonText[student.applicant_id] === "Loading..."
                          } // Disable while loading
                        >
                          {/* {student.cycle_distribution_date
                                                            ? "Entered"
                                                            : "Update"} */}
                          {student.cycle_distribution_date ||
                          buttonText[student.applicant_id] === "Entered"
                            ? "Entered"
                            : "Update"}
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
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        closeable={true}
      >
        <DistributionModal
          modaldata={frameData}
          frameupdate={frameUpdate}
          onClose={handleCloseModal}
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
};

export default DistributionUploadView;
