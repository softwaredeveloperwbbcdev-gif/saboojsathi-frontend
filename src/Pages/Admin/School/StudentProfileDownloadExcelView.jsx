import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const StudentProfileDownloadExcelView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const phaseName = phaseDetails["phaseName"];

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const locationName = user.name;
  const diseCode = user.login_cd;

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `StudentProfileDownloadExcel/${phaseId}`,
        {}, // Data object is empty for a GET request
        { responseType: "blob" } // Specify the response type here
      );

      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Download failed: ${response.message}`);
      } else {
        // Handle the successful download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx");
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
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Download Student Profile Details (Phase {phaseName}) for{" "}
            {locationName
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    School Dise Code
                  </th>
                  <th scope="col" className="p-4">
                    School Name
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Current Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="p-4">{diseCode}</td>
                  <td className="p-4">{locationName}</td>
                  <td className="p-4">
                    <button
                      onClick={handleDownload}
                      className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                      Download Student Profile Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
          {/* Main Content */}
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
};

export default StudentProfileDownloadExcelView;
