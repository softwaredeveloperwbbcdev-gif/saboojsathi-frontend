import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function EligibleStudentReport() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `repo-eligible-student-download`,
        { phaseId }, // Data object is empty for a GET request
        { responseType: "blob" } // Specify the response type here
      );

      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Download failed: ${response.message}`);
      } else {
        //////////////////////////////////////
        const phase = phaseDetails.phaseName; // e.g., "3"
        const year = phaseDetails.year; // e.g., "2025"

        const filename = `District_Wise_Eligible_Students_Phase_${phase}_${year}.xlsx`;
        // Handle the successful download
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `repo-eligible-student/${phaseId}`); // API call

      console.log(response);
      if (response.error) {
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const total_boys = data.reduce((acc, value) => {
    return acc + value.eligible_students_class_ix_boys;
  }, 0);

  const total_girls = data.reduce((acc, value) => {
    return acc + value.eligible_students_class_ix_girls;
  }, 0);
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 tracking-tight">
            District Wise Eligible Student Report Phase {phaseDetails.phaseName}{" "}
            For Academic Year&nbsp;
            {phaseDetails.year}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* Download Button */}
          {data.length != 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownload}
                className="relative bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none"
              >
                Download
              </button>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Serial. No.
                  </th>
                  <th scope="col" className="p-4">
                    District Name
                  </th>
                  <th scope="col" className="p-4">
                    Eligible Students(Boys)
                  </th>
                  <th scope="col" className="p-4">
                    Eligible Students(Girls)
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="text-center p-2 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">
                          <Link
                            to={`/EligibleStudentReportBlock/${phaseId}/${btoa(
                              value.district_id_pk
                            )}`}
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-4">
                          {value.eligible_students_class_ix_boys}
                        </td>
                        <td className="p-4">
                          {value.eligible_students_class_ix_girls}
                        </td>
                        <td className="p-4">
                          {value.eligible_students_class_ix_boys +
                            value.eligible_students_class_ix_girls}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="p-4">
                        Total
                      </td>
                      <td className="p-4">{total_boys}</td>
                      <td className="p-4">{total_girls}</td>
                      <td className="p-4">{total_boys + total_girls}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {loading && <Loader />} {/* 👈 show the loader component */}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
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

export default EligibleStudentReport;
